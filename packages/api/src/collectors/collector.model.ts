import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collector {
  @Field(type => Int)
  id: number;
}