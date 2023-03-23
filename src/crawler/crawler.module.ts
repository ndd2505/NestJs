import { Module } from '@nestjs/common';

import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
// import { Movies } from './movies.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Movies])
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
