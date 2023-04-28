import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { OrmModule } from '../orm/orm.module';

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key'
@Module({
  imports: [
    OrmModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_IN || '1m' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule { }