import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { GetDetailMoviesInput } from './inputs/movies.input';
import { Movies } from './typedefs/movies.typedef';
import { MoviesService } from './movies.service';

@Resolver(() => Movies)
export class MoviesResolver {
  constructor(private moviesService: MoviesService) {}

  @Query(() => Movies)
  async movie(@Args('input') input: GetDetailMoviesInput) {
    return this.moviesService.findById(input.id);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
