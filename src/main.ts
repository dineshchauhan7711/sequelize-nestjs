import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from "./core/config/config";
import { ValidationExceptionFilter } from "./core/response/filter/exception.filter";
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For validation
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      validateCustomDecorators: true
    }),
  );

  // Add global filters
  app.useGlobalFilters(new ValidationExceptionFilter());

  // Add global prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(Config.port, () => {
    console.log(`Server running on port ${Config.port}.`);
  });

}
bootstrap();
