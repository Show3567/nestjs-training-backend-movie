import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private readonly openAi = new OpenAI({
    apiKey: this.configService.get('OPENAI_API_KEY'),
    organization: this.configService.get('OPENAI_ORG_ID'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  async getModelAnswer(question: string) {}
}
