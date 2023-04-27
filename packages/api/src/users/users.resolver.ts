import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Resolver()
export class UsersResolver {


  @Query(() => User)
  async getUser(
    @Args('username') username?: string,
  ) {

    return { username: 'test', email: 'test' }
  }
}
