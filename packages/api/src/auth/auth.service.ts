
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginArgs, RegisterUserArgs } from './auth.dto';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(username);

    if (user && bcrypt.compareSync(pass, user.password, 8)) {
      console.log('user', user);

      return user;
    }
    return null;
  }

  async login(loginArgs: LoginArgs) {
    const user = await this.validateUser(loginArgs.email, loginArgs.password)
    if (!user) return new UnauthorizedException();

    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterUserArgs) {
    const password = bcrypt.hashSync(user.password, 8);

    const createUser = await this.usersService.create({
      ...user,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    } as unknown as User);

    return createUser;
  }

}