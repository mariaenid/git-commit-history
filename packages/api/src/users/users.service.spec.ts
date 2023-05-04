import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { OrmModule } from '../orm/orm.module';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmModule],
      providers: [UsersService, Repository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
