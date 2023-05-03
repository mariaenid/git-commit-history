import { Test, TestingModule } from '@nestjs/testing';
import { ApiGithubService } from './api-github.service';

describe('ApiGithubService', () => {
  let service: ApiGithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiGithubService],
    }).compile();

    service = module.get<ApiGithubService>(ApiGithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
