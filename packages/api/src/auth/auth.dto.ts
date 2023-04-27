import { Field, ObjectType } from '@nestjs/graphql';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  public readonly username?: string;
}

@ObjectType()
export class LoginDto {
  @Field(type => String)
  username: string;

  @Field(type => String)
  password: string;
}

