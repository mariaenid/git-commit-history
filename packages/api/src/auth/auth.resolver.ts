import { Resolver, Args, Query, Context, Mutation, ResolveField, createUnionType, ObjectType } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException, ClassSerializerInterceptor, Inject, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Login, LoginResult } from '../users/users.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { Public } from './decorators';
import { Strategy } from 'passport-jwt';
import { LocalStrategy } from './strategies/local.strategy';


@Resolver('Login')
export class AuthResolver {

  @Inject(AuthService)
  private readonly authService: AuthService;

  /*
  @Query(() => LoginResult)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Args('user') user: RegisterDto): Promise<any | never> {

    return this.authService.register(user)
  }*/


  @Public()
  @Mutation(() => Login)
  async login(
    @Args('username', { nullable: true }) username?: string,
    @Args('password', { defaultValue: '' }) password?: string,
  ) {
    const result = await this.authService.login({ username, password });

    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }

  /*
  // There is no username guard here because if the person has the token, they can be any user
  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: any = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      );


    const result = await this.authService.refresh(user);
    if (result) return result;
    throw new UnauthorizedException(
      'Could not log-in with the provided credentials',
    );
  }*/
}