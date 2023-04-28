import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UsersService } from './users.service';
import { BaseResolver } from '../utils';

@UseGuards(JwtAuthGuard)
@Resolver((of) => User)
export class UsersResolver extends BaseResolver(User) {
  constructor(private userService: UsersService) {
    super();
    this.service = userService;
  }

  @Query(() => User)
  async getUserByEmail(
    @Args('email') email?: string,
  ) {
    return await this.service.findByEmail(email)
  }
}
