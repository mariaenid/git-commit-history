import { Test, TestingModule } from '@nestjs/testing';
import { ApiGithubResolver } from './api-github.resolver';

describe('ApiGithubResolver', () => {
  let resolver: ApiGithubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiGithubResolver],
    }).compile();

    resolver = module.get<ApiGithubResolver>(ApiGithubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
