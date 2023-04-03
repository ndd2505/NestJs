import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetDetailMoviesInput {
  @Field(() => Int)
  id: number;
}
