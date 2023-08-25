import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestOptions } from 'https';

@Injectable()
export class GptService {
  config: RequestOptions = {
    headers: {
      Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
    },
  };

  constructor(private readonly configService: ConfigService) {
    console.log(this.config.headers);
  }

  sendQuestion() {}
}
