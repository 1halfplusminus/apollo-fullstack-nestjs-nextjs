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
  Context,
  ID,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { AuthUser, CurrentUser } from '../auth/auth.decorators';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Launch, LaunchArgs, LaunchConnect } from '../models/launch.model';
import { TripUpdateResponse } from '../models/trip-update-response';
import { UsersService } from '../users/users.service';
import { paginateResults } from '../utils';
import { LaunchsService } from './launchs.service';

interface LaunchsResolverContext {
  user?: User;
}

@Resolver((of) => Launch)
export class LaunchsResolver {
  constructor(
    private launchService: LaunchsService,
    private userService: UsersService,
  ) {}

  @Query((returns) => LaunchConnect)
  async launches(
    @Args() { after, pageSize }: LaunchArgs,
    @Context() context: LaunchsResolverContext,
    @AuthUser() user: User,
  ): Promise<LaunchConnect> {
    context.user = user;
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
  @CacheKey('launch')
  @CacheTTL(20)
  async launch(
    @Args({ name: 'launchId', type: () => ID })
    launchId: number,
    @Context() context: LaunchsResolverContext,
    @AuthUser() user: User,
  ) {
    context.user = user;
    return this.launchService.getLaunchById({ launchId });
  }
  @Mutation((returns) => TripUpdateResponse)
  @UseGuards(GqlAuthGuard)
  async bookTrips(
    @Args({ name: 'launchIds', type: () => [ID] })
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
    @Args({ name: 'launchId', type: () => ID })
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
  async isBooked(
    @Parent() launch: Launch,
    @Context() { user }: LaunchsResolverContext,
  ) {
    if (!user) return false;
    const isBooked = await this.userService.isBookedOnLaunch({
      userId: user.id,
      launchId: Number(launch.id),
    });
    return isBooked;
  }
}
