import {
  CacheModule,
  DynamicModule,
  HttpModule,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { LaunchsService } from './launchs.service';
import { LaunchsResolver } from './launchs.resolver';
import { LaunchsUsersResolver } from './launchs-users.resolver';
import { MissionsResolver } from './missions.resolver';

const imports = [
  HttpModule.register({ baseURL: 'https://api.spacexdata.com/v2/' }),
  CacheModule.register(),
];

@Module({
  imports: imports,
  providers: [
    LaunchsService,
    LaunchsResolver,
    LaunchsUsersResolver,
    MissionsResolver,
  ],
})
export class LaunchsModule {
  static forRoot(modules: ModuleMetadata): DynamicModule {
    return {
      module: LaunchsModule,
      imports: imports,
      providers: [LaunchsService, LaunchsResolver],
      ...modules,
    };
  }
}
