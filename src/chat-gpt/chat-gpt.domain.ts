import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';

@Injectable()
export class ChatGPTDomain {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      organization: process.env.OPEN_AI_ORGANIZATION,
      project: process.env.OPEN_AI_PROJECT,
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  async executePrompt(prompt: string): Promise<ChatCompletion> {
    return await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
  }
}
