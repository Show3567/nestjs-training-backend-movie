import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = 4231;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

/* 
    Typeorm:
    npm i @nestjs/typeorm typeorm pg

    Class libs:
    npm i class-validator class-transformer

    Bcrypt:
    npm i bcrypt

    JWT:
    npm i @nestjs/jwt @nestjs/passport passport passport-jwt
    npm i @types/passport-jwt

    Swagger:
    npm i @nestjs/swagger swagger-ui-express
    
    Config: 
    npm i @nestjs/config
    
    Joi varification: 
    npm i @hapi/joi
    
    Strong JWT secret: 
    https://passwordsgenerator.net/
*/
