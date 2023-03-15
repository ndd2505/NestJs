// nestjs Modules
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Modules
import { MoviesModule } from './Movies/movies.module';

// Service
import { AppService } from './app.service';

// Controller
import { AppController } from './app.controller';

// Entity
import { Movies } from './Movies/movies.entity';

//Middleware
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'secret',
      database: 'New',
      entities: [Movies],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: 'movies', method: RequestMethod.GET });
  }
}
