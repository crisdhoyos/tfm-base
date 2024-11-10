import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import OpenAI from 'openai';
import { TranscriptionVerbose } from 'openai/resources/audio/transcriptions';
import { Uploadable } from 'openai/uploads';

@Injectable()
export class WhisperDomain {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      organization: process.env.OPEN_AI_ORGANIZATION,
      project: process.env.OPEN_AI_PROJECT,
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  async getTranscription(
    audioFile: Uploadable | fs.ReadStream,
    language: string = 'es',
  ): Promise<TranscriptionVerbose> {
    return await this.openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language, // https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });
  }
}
