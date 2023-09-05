import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GPTMessageDTO } from './dto/msg.dto';

@Controller('gpt')
export class GptController {
  constructor(private gptSrevice: GptService) {}

  @Post()
  async getModelAnswer(@Body() gptMassage: GPTMessageDTO) {
    return this.gptSrevice.getModelAnswer(gptMassage.msg);
  }
}
