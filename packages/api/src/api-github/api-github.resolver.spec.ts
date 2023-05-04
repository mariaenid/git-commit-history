import { Test, TestingModule } from '@nestjs/testing';
import { ApiGithubResolver } from './api-github.resolver';
import { ApiGithubService } from './api-github.service';
import { HttpModule } from '@nestjs/axios';

describe('ApiGithubResolver', () => {
  let resolver: ApiGithubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiGithubResolver, ApiGithubService],
    }).compile();

    resolver = module.get<ApiGithubResolver>(ApiGithubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
