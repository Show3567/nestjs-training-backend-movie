import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GPTMessageDTO } from './dto/msg.dto';
import OpenAI from 'openai';

@Controller('gpt')
export class GptController {
  constructor(private gptSrevice: GptService) {}

  @Post()
  async getModelAnswer(
    @Body() gptMassage: GPTMessageDTO,
  ): Promise<{ role: string; content: string }> {
    const res = this.gptSrevice.getModelAnswer(gptMassage);
    return (await res).message;
  }
}
