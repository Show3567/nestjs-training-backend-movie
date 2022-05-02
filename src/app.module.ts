import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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
    
    Hold JWT secure: 
    https://passwordsgenerator.net/
*/
