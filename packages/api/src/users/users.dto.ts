import { IsOptional, IsString } from 'class-validator';
export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  id: string;


  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  email: string;

};


@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  username?: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  username?: string;
  @Field(() => String)
  email?: string;
  password?: UpdatePasswordInput;
  @Field(() => Boolean)
  enabled?: boolean;
}

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User;
  @Field(() => String)
  access_token: string;
}

@ObjectType()
export class SignOutResult {
  @Field(() => User)
  user: User;
  @Field(() => null)
  token: null;
}


@ObjectType()
export class Login {
  user: User
  @Field(() => String)
  access_token: string;

};

