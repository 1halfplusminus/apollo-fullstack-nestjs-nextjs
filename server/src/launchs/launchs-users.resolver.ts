import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/auth.decorators';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Launch } from 'src/models/launch.model';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { LaunchsService } from './launchs.service';

@Resolver((type) => User)
export class LaunchsUsersResolver {
  constructor(
    private usersService: UsersService,
    private launchsService: LaunchsService,
  ) {}
  @ResolveField((returns) => [Launch])
  @UseGuards(GqlAuthGuard)
  async trips(@CurrentUser() user: User) {
    const launchIds = await this.usersService.getLaunchIdsByUser({
      userId: user.id,
    });
    if (!launchIds.length) return [];
    return this.launchsService.getLaunchesByIds({ launchIds });
  }
}
