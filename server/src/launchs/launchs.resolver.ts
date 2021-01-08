import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/auth.decorators';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Launch, LaunchArgs, LaunchConnect } from 'src/models/launch.model';
import { TripUpdateResponse } from 'src/models/trip-update-response';
import { UsersService } from 'src/users/users.service';
import { paginateResults } from 'src/utils';
import { LaunchsService } from './launchs.service';

@Resolver((of) => Launch)
export class LaunchsResolver {
  constructor(
    private launchService: LaunchsService,
    private userService: UsersService,
  ) {}

  @Query((returns) => LaunchConnect)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('launchs')
  @CacheTTL(20)
  @UseGuards(GqlAuthGuard)
  async launchs(
    @Args() { after, pageSize }: LaunchArgs,
  ): Promise<LaunchConnect> {
    const allLaunches = await this.launchService.getAllLaunches();
    const launches = paginateResults({
      after,
      pageSize,
      results: allLaunches,
    });
    const cursor = launches.length
      ? launches[launches.length - 1].cursor
      : null;
    return {
      cursor: cursor,
      hasMore:
        cursor !== allLaunches[allLaunches.length - 1].cursor ? true : false,
      launches,
    };
  }
  @Query((returns) => Launch)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('launch')
  @CacheTTL(20)
  @UseGuards(GqlAuthGuard)
  async launch(
    @Args({ name: 'launchId', type: () => Int })
    launchId: number,
  ) {
    return this.launchService.getLaunchById({ launchId });
  }
  @Mutation((returns) => TripUpdateResponse)
  @UseGuards(GqlAuthGuard)
  async bookTrips(
    @Args({ name: 'launchIds', type: () => [Int] })
    launchIds: number[],
    @CurrentUser() user: User,
  ) {
    const results = await this.userService.bookTrips({
      launchIds,
      userId: user.id,
    });
    const launches = await this.launchService.getLaunchesByIds({
      launchIds,
    });
    return {
      success: results && results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? 'trips booked cucessfully'
          : `the following launches couldn't be booked: ${launchIds.filter(
              (id) => !results.map((r) => r.id).includes(id),
            )}`,
      launches,
    };
  }

  @Mutation((returns) => TripUpdateResponse)
  @UseGuards(GqlAuthGuard)
  async cancelTrip(
    @Args({ name: 'launchId', type: () => Int })
    launchId: number,
    @CurrentUser() user: User,
  ) {
    const result = await this.userService.cancelTrip({
      launchId,
      userId: user.id,
    });
    if (!result)
      return {
        success: false,
        message: 'failed to cancle trip!',
        launches: [],
      };
    const launch = await this.launchService.getLaunchById({ launchId });
    return {
      success: true,
      message: 'trip cancelled',
      launches: [launch],
    };
  }
  @ResolveField((returns) => [Boolean])
  async isBooked(@CurrentUser() user: User, @Parent() launch: Launch) {
    if (!user) return false;
    const isBooked = await this.userService.isBookedOnLaunch({
      userId: user.id,
      launchId: Number(launch.id),
    });
    return isBooked;
  }
}
