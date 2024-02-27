import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const PORT = process.env.PORT || 4231;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      snapshot: true,
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: +PORT,
      },
    },
  );
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

  await app.listen();
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();

/* 
    & Typeorm:
    $ npm i @nestjs/typeorm typeorm pg

    & Class libs:
    $ npm i class-validator class-transformer

    & Bcrypt:
    $ npm i bcrypt

    & JWT:
    $ npm i @nestjs/jwt @nestjs/passport passport passport-jwt passport-google-oauth2 passport-local
    $ npm i -D @types/passport-google-oauth2 @types/passport-jwt @types/passport-jwt @types/passport-local

    & Swagger:
    $ npm i @nestjs/swagger swagger-ui-express
    --------------add to nest-cli.json--------------------------
    +   "compilerOptions": {
    +       "deleteOutDir": true,
    +       "plugins": ["@nestjs/swagger/plugin"]
    +   }
    
    & Config: 
    $ npm i @nestjs/config
    
    & Joi varification: 
    $ npm i @hapi/joi
    
    & Strong JWT secret: 
    https://passwordsgenerator.net/

    & Cookie-parser
    $ npm i cookie-parser
    $ npm i -D @types/cookie-parser

    & Mongodb Online Database:
    $ npm i @nestjs/mongoose mongoose
    mongodb cloud username: antraAngular, password: jVoARhjqNU6GtZQG
    mongodb+srv://antraAngular:jVoARhjqNU6GtZQG@cluster0.uqd3b.mongodb.net/test

    & Apollo Graphql:
    $ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express

    MicroServices
    $ npm i --save @nestjs/microservices

    & Upgrade Nestjs version 8 ---> 9
    $ npm install -g @nestjs/cli npm-check-updates
    $ nest update
    
    OnGcp https://nestjs-training-project.uc.r.appspot.com

    & add redis
    $ npm install @nestjs/cache-manager cache-manager
*/
