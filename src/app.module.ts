import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,

        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
      }),
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
