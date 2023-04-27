import { Test, TestingModule } from '@nestjs/testing';
import { CollectorsResolver } from './collectors.resolver';

describe('CollectorsResolver', () => {
  let resolver: CollectorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectorsResolver],
    }).compile();

    resolver = module.get<CollectorsResolver>(CollectorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
