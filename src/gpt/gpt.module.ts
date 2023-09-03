import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
