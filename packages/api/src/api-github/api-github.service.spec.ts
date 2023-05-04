import { Test, TestingModule } from '@nestjs/testing';
import { ApiGithubService } from './api-github.service';
import { HttpModule } from '@nestjs/axios';

describe('ApiGithubService', () => {
  let service: ApiGithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiGithubService],
    }).compile();

    service = module.get<ApiGithubService>(ApiGithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
