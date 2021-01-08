import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService,UsersResolver],
  exports: [UsersService, UsersResolver]
})
export class UsersModule {
  static forRoot(modules: ModuleMetadata): DynamicModule {
    return {
      module: UsersModule,
      providers: [UsersService,UsersResolver],
      exports: [UsersService, UsersResolver],
      ...modules
    };
  }
}
