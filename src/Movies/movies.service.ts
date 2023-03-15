import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Movies } from './movies.entity';
import { CreateMovieDto } from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  findAll(): Promise<Movies[]> {
    return this.moviesRepository.find();
  }

  findById(id: number): Promise<Movies> {
    return this.moviesRepository.findOneBy({ id });
  }

  create(data: CreateMovieDto): Promise<Movies> {
    return this.moviesRepository.save(data);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.moviesRepository.delete(id);
  }

  update(id: number, body): Promise<Movies> {
    this.moviesRepository.update(id, body);
    return this.findById(id);
  }
}
