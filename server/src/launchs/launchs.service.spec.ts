import { Test, TestingModule } from '@nestjs/testing';
import { LaunchsService } from './launchs.service';

describe('LaunchsService', () => {
  let service: LaunchsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunchsService],
    }).compile();

    service = module.get<LaunchsService>(LaunchsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
