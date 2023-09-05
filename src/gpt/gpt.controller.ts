import { Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private gptSrevice: GptService) {}

  @Post()
  async getModelAnswer() {
    return this.gptSrevice.getModelAnswer('hello');
  }
}
