import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  //   constructor() {} // private moviesRepository: Repository<Movies>, // @InjectRepository(Movies)

  crawl() {
    console.log('F');
    return {
      code: 200,
    };
  }
}
