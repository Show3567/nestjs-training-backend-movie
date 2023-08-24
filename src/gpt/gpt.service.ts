import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
  constructor(@Inject('GPTTOKEN') private gptToken: string) {
    console.log('new token');
  }
}
