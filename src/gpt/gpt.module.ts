import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';

@Module({
  imports: [ConfigModule],
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
