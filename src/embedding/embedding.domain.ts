import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Embedding } from 'openai/resources';
import * as tiktoken from 'tiktoken';

@Injectable()
export class EmbeddingDomain {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      organization: process.env.OPEN_AI_ORGANIZATION,
      project: process.env.OPEN_AI_PROJECT,
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  calculateTokens(
    text: string,
    model: tiktoken.TiktokenModel = 'text-embedding-ada-002',
  ): number {
    const encoding = tiktoken.encoding_for_model(model);
    return encoding.encode(text).length;
  }

  async getEmbeddings(
    segments: string[],
    model: string = 'text-embedding-ada-002',
  ): Promise<Embedding[]> {
    const response = await this.openai.embeddings.create({
      model,
      input: segments,
    });
    return response.data;
  }
}
