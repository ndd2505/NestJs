import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as moment from 'moment';
import { DeleteResult, LessThan, Repository } from 'typeorm';

import { CreateMovieDto } from './movies.dto';
import { Movies } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  crawl() {
    return axios
      .get('https://www.cgv.vn/api/movie/listSneakShow?cat=2')
      .then(async (res) => {
        if (res?.status == 200) {
          const data = res?.data?.data || [];

          try {
            const cookedData = data.map((item) => {
              return {
                name: item?.name,
                released_date: item?.release_date,
                length: item?.movie_endtime,
                poster: item?.thumbnail,
                rating: null,
                // update_at: dateRecent,
                crawl_at: moment().toDate(),
              };
              // this.create(dataCooked);
            });
            await this.moviesRepository.delete({
              crawl_at: LessThan(new Date()),
            });
            // console.log(
            //   '🚀 ~ file: movies.service.ts:45 ~ MoviesService ~ cookedData ~ crawl_at:',
            //   moment(),
            // );
            // return cookedData;

            this.moviesRepository.save(cookedData);
          } catch (e) {
            throw new InternalServerErrorException(e);
          }
        } else {
          throw new InternalServerErrorException();
        }
      });
  }

  findAll(): Promise<Movies[]> {
    return this.moviesRepository.find();
  }

  async findById(id: number): Promise<Movies | null> {
    const value = await this.moviesRepository.findOneBy({ id });
    console.log(value, id);
    if (!value) {
      console.log('do');
      throw new NotFoundException();
    }
    return value;
  }

  create(data: CreateMovieDto): Promise<Movies> {
    return this.moviesRepository.save(data);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.moviesRepository.delete(id);
  }

  async update(id: number, body): Promise<Movies | null> {
    // const hasId = await this.moviesRepository.hasId(id);
    // if (!hasId) {
    //   throw new BadRequestException();
    // }
    this.moviesRepository.update(id, body);
    return this.findById(id);
  }
}
