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

import { SampleService } from './sample.service';

@Controller('movies')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

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
      return this.sampleService.findAll();
    } else {
      return this.sampleService.findById(id);
    }
  }
}
