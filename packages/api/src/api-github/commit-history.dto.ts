import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommitDetail {
  @Field(() => String, { nullable: true })
  sha: string;


  @Field(() => String, { nullable: true })
  url: string;

  @Field(() => String, { nullable: true })
  author: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  date: Date;

};
