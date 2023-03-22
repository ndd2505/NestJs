import { Controller, Get } from '@nestjs/common';

import { CrawlerService } from './crawler.service';
// import { CreateMovieDto } from './movies.dto';

@Controller('crawl')
export class CrawlerController {
  constructor(private readonly CrawlerService: CrawlerService) {}

  @Get()
  crawl() {
    return this.CrawlerService.crawl();
  }
}
