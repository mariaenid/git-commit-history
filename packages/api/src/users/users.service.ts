import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { BaseService } from '../utils';


@Injectable()
export class UsersService extends BaseService(User) {
  repository: Repository<User>;

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) {
    super();
    this.repository = usersRepository;
  }


  async findByEmail(username: string): Promise<User | undefined> {
    //return this.users.find(user => user.username === username) as any;

    return this.repository.findOneBy({ email: username })
  }

  async create(user: User) {
    const metadataUser = this.usersRepository.create({ ...user });
    return this.repository.save(metadataUser);
  }

}