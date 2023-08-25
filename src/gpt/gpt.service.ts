import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import OpenAI from 'openai';
const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class GptService {
  readonly config = new Configuration({
    apiKey: this.configService.get('OPENAI_API_KEY'),
    organization: this.configService.get('OPENAI_ORG_ID'),
  });
  openai = new OpenAIApi(this.config);

  constructor(private readonly configService: ConfigService) {}

  async sendRequest(msg: string) {
    const res = await this.openai.CreateChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'hello',
        },
      ],
    });
    console.log(res);
  }
}
