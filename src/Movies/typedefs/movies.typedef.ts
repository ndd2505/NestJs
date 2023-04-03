import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movies {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;
}
