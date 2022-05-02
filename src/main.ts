import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    // transform type auto;
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
    await app.listen(4231);
}
bootstrap();
