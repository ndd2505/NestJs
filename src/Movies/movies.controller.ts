import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateMovieDto } from './movies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/crawl')
  crawl() {
    return this.moviesService.crawl();
  }

  @Get()
  test(
    @Req() req: Request,
    @Query(
      'id',
      new DefaultValuePipe(0),
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id?: number,
  ): any {
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
  delete(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.moviesService.delete(id);
  }

  @Put()
  update(@Query() query, @Body() body) {
    return this.moviesService.update(query, body);
  }
}
