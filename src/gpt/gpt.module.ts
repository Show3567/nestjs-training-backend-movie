import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';

@Module({
  controllers: [GptController],
  providers: [
    GptService,
    {
      provide: 'OPENAI_API_KEY',
      useValue: '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',
    },
  ],
})
export class GptModule {}
