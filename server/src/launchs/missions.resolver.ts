import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Mission, PatchSize } from 'src/models/mission.model';
import { UsersService } from 'src/users/users.service';
import { LaunchsService } from './launchs.service';

@Resolver((type) => Mission)
export class MissionsResolver {
  constructor() {}

  @ResolveField((returns) => String)
  async missionPatch(
    @Args({ type: () => PatchSize, name: 'size' }) size: PatchSize,
    @Parent() mission: Mission,
  ) {
    return size === PatchSize.SMALL
      ? mission.missionPatchSmall
      : mission.missionPatchLarge;
  }
}
