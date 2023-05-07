import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   credentials: true,
  //   origin: 'http://localhost:4200',
  // });
  app.enableCors();
  app.use(CookieParser());
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

  /* for swagger documentation */
  const options = new DocumentBuilder()
    .setTitle('MoviesBackEnd')
    .setDescription(
      'This backend for myMovie web project for Angular Training~',
    )
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = 4231;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

/* 
    Typeorm:
    $ npm i @nestjs/typeorm typeorm pg

    Class libs:
    $ npm i class-validator class-transformer

    Bcrypt:
    $ npm i bcrypt

    JWT:
    $ npm i @nestjs/jwt @nestjs/passport passport passport-jwt
    $ npm i @types/passport-jwt

    Swagger:
    $ npm i @nestjs/swagger swagger-ui-express
    --------------add to nest-cli.json--------------------------
    +   "compilerOptions": {
    +       "deleteOutDir": true,
    +       "plugins": ["@nestjs/swagger/plugin"]
    +   }
    
    Config: 
    $ npm i @nestjs/config
    
    Joi varification: 
    $ npm i @hapi/joi
    
    Strong JWT secret: 
    https://passwordsgenerator.net/

    Cookie-parser
    $ npm i cookie-parser
    $ npm i -D @types/cookie-parser

    Mongodb Online Database:
    $ npm i @nestjs/mongoose mongoose
    mongodb cloud username: antraAngular, password: jVoARhjqNU6GtZQG
    mongodb+srv://antraAngular:jVoARhjqNU6GtZQG@cluster0.uqd3b.mongodb.net/test

    Apollo Graphql:
    $ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express

    MicroServices
    $ npm i --save @nestjs/microservices

*/
