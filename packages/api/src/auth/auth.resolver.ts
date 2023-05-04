import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginResult } from '../users/users.dto';
import { Public } from './decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { User as UserEntity } from '../entities';

@Resolver('Login')
export class AuthResolver {

  @Inject(AuthService)
  private readonly authService: AuthService;

  @Public()
  @Mutation(() => LoginResult)
  async register(
    @Args('name', { nullable: false }) name: string,
    @Args('email', { nullable: false }) email: string,
    @Args('lastName', { nullable: false }) lastName: string,
    @Args('password', { nullable: false }) password: string,
  ) {
    const user = { name, email, lastName, password, };
    return this.authService.register(user);
  }

  @Public()
  @Mutation(() => LoginResult)
  async login(
    @Args('username', { nullable: true }) username?: string,
    @Args('password', { defaultValue: '' }) password?: string,
  ) {
    const result = await this.authService.login({ email: username, password });

    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }


  @Query(() => LoginResult)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Context('req') request: any) {
    const user: unknown = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );


    const result = await this.authService.refresh(user as UserEntity);
    if (result) return result;
    throw new UnauthorizedException(
      'Could not log-in with the provided credentials',
    );
  }
}