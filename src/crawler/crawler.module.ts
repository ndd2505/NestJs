import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';

import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
// import { Movies } from './movies.entity';

@Module({
  imports: [
    PuppeteerModule.forRoot(
      { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
      'BrowserInstanceName', // optional, can be useful for using Chrome and Firefox in the same project
    ),
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
