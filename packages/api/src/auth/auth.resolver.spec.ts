import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { OrmModule } from '../orm/orm.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrmModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          global: true,
          secret: 'test',
          signOptions: { expiresIn: '10m' },
        }),
      ],
      providers: [AuthResolver, AuthService, UsersService, JwtStrategy],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
