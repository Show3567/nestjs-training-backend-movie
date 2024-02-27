import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

import { configValidationSchema } from './config/config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthCookieModule } from './auth-cookies/auth-c.module';
import { MoviesModule } from './movies/movies.module';
import { GptModule } from './gpt/gpt.module';
import { UsersModule } from './users/users.module';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    /* config */
    ConfigModule.forRoot({
      //   envFilePath: [`.env.stage.${process.env.STAGE}`],
      envFilePath: [`.env.stage.dev`],
      load: [ormConfig],
      validationSchema: configValidationSchema,
    }),
    /* typeorm */
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    /* nestjs devtools */
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),

    AuthModule,
    AuthCookieModule,
    MoviesModule,
    GptModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/* Connect to local postgres 
    return {
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
    };
*/
