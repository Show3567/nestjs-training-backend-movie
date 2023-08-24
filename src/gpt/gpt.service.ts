import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
  config = {
    headers: {
      Authorization: `Bearer ${this.API_KEY}`,
    },
  };

  constructor(@Inject('OPENAI_API_KEY') private readonly API_KEY: string) {}

  sendQuestion() {}
}
