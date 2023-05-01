import { Args, ArgsType, Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { ArgsFactory } from '@nestjs/graphql/dist/schema-builder/factories/args.factory';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';


@ObjectType()
export class RegisterUserArgs {
  @Field(() => String, { nullable: false })
  id?: string

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  email: string;
}


@ObjectType()
export class LoginArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}



@ObjectType()
export class LoginResult {
  user: RegisterUserArgs;

  @Field(() => String)
  access_token: string;
}

