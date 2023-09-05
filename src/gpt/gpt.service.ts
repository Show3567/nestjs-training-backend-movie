import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAi: OpenAI = new OpenAI({
    apiKey: this.configService.get('OPENAI_API_KEY'),
    organization: this.configService.get('OPENAI_ORG_ID'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  async getModelAnswer(question: string) {
    try {
      const response = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello!' }],
      });
      console.log(response.choices[0].message);
    } catch (error) {
      console.log('[CONVERSATION_ERROR]', error);
      return new Response('Internal error', { status: 500 });
    }
  }
}
