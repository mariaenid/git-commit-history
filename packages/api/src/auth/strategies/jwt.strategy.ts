import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(UsersService)
  private readonly userService: UsersService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.userService.findByEmail(payload.username);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, { id: user.id }, payload.iat);
  }
}