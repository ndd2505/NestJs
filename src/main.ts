import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';

import { AuthGuard } from './app.guard';
import { AppModule } from './app.module';
import HttpExceptionFilter from './app-exception.filter';
import { CommandModule } from './command.module';
import { LogService } from './log.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { abortOnError: false });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //     transform: true,
  //   }),
  // );

  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  // app.useGlobalGuards(new AuthGuard());

  // await app.listen(3000);

  await CommandFactory.run(CommandModule);
}
bootstrap();
