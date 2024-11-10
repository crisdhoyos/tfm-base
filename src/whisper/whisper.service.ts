import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { TranscriptionVerbose } from 'openai/resources/audio/transcriptions';
import { Uploadable } from 'openai/uploads';
import { WhisperDomain } from './whisper.domain';

@Injectable()
export class WhisperService {
  constructor(private readonly whisperDomain: WhisperDomain) {}

  async getAudioTranscription(
    audioFile: Uploadable | fs.ReadStream,
  ): Promise<TranscriptionVerbose> {
    return await this.whisperDomain.getTranscription(audioFile);
  }

  async getAudioTranscriptionFromLocal(): Promise<TranscriptionVerbose> {
    const audio = this.readLocalFile();
    return await this.getAudioTranscription(audio);
  }

  readLocalFile(filename: string = '10seg.mp4'): fs.ReadStream {
    return fs.createReadStream(filename);
  }
}
