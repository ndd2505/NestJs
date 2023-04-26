// nestjs Modules
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// ModulesCrawlerService
import { CrawlerModule } from './crawler/crawler.module';
// Customers
import { Customers } from './customers/customers.entity';
import { CustomersModule } from './customers/customers.module';
// Movies
import { Movies } from './movies/movies.entity';
import { MoviesModule } from './movies/movies.module';
import { OrderDetails } from './orders/order-details.entity';
//Orders
import { Orders } from './orders/orders.entity';
import { OrdersModule } from './orders/orders.module';
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
    CustomersModule,
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'secret',
      database: 'New',
      entities: [Movies, Customers, Orders, OrderDetails],
      synchronize: false,
      logging: true,
      dropSchema: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [MoviesModule],
      // autoSchemaFile: 'schema.gql',
      autoSchemaFile: true,
      sortSchema: true,
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
