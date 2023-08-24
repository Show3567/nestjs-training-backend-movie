import { Controller } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private gptSrevice: GptService) {}
}
