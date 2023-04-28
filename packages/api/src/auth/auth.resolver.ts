import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException, Inject, } from '@nestjs/common';
import { LoginResult } from '../users/users.dto';
import { Public } from './decorators';


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
    const user = { name, email, lastName, password };
    const newUser = await this.authService.register(user);

    return { user: newUser }
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