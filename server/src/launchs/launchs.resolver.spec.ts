import { Test, TestingModule } from '@nestjs/testing';
import { LaunchsResolver } from './launchs.resolver';

describe('LaunchsResolver', () => {
  let resolver: LaunchsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunchsResolver],
    }).compile();

    resolver = module.get<LaunchsResolver>(LaunchsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
