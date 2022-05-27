import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configValidationSchema } from './config/config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthCModule } from './auth-c/auth-c.module';

@Module({
  imports: [
    /* config */
    ConfigModule.forRoot({
      //   envFilePath: [`.env.stage.${process.env.STAGE}`],
      envFilePath: [`.env.stage.dev`],
      validationSchema: configValidationSchema,
    }),
    /* typeorm */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MODB_URL'),
          useUnifiedTopology: true,
          useNewUrlParser: true,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    // /* apollo */
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   playground: false,
    // }),
    AuthModule,
    AuthCModule,
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
