// nestjs Modules
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// ModulesCrawlerService
import { CrawlerModule } from './crawler/crawler.module';
// Entity
import { Movies } from './movies/movies.entity';
import { MoviesModule } from './movies/movies.module';
// Controller
import { AppController } from './app.controller';
// Guard
import { AuthGuard } from './app.guard';
//Middleware
import { AppMiddleware } from './app.middleware';
// Service
import { AppService } from './app.service';
// Exception
import HttpExceptionFilter from './app-exception.filter';

@Module({
  imports: [
    MoviesModule,
    CrawlerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'secret',
      database: 'New',
      entities: [Movies],
      synchronize: true,
      logging: true,
      // dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: 'movies', method: RequestMethod.GET });
  }
}
