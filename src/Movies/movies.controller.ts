import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './movies.dto';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  test(@Req() req: Request, @Query() que): any {
    const id = que?.id;
    if (!id) {
      return this.moviesService.findAll();
    } else {
      return this.moviesService.findById(id);
    }
  }

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @Delete()
  delete(@Query() query) {
    return this.moviesService.delete(query);
  }

  @Put()
  update(@Query() query, @Body() body) {
    return this.moviesService.update(query, body);
  }
}
