import { HttpService } from '@nestjs/axios';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GPTMessageDTO } from './dto/msg.dto';

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

  async getModelAnswer(
    question: GPTMessageDTO,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion.Choice> {
    try {
      const syscontent = question.sys ? question.sys : '';

      const response = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: syscontent },
          { role: 'user', content: question.msg },
        ],
      });
      return response.choices[0];
    } catch (error) {
      console.log('[CONVERSATION_ERROR]', error);
      throw new NotAcceptableException('error');
    }
  }
}
