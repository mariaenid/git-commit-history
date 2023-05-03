import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { OrmModule } from '../orm/orm.module';

const SECRET_KEY = process.env.SECRET_KEY
@Module({
  imports: [
    OrmModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_IN || '10m' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule { }