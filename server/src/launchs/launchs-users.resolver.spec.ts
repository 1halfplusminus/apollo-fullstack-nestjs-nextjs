import { Test, TestingModule } from '@nestjs/testing';
import { LaunchsUsersResolver } from './launchs-users.resolver';

describe('LaunchsUsersResolver', () => {
  let resolver: LaunchsUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunchsUsersResolver],
    }).compile();

    resolver = module.get<LaunchsUsersResolver>(LaunchsUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
