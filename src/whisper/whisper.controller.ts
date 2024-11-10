import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TranscriptionVerbose } from 'openai/resources/audio/transcriptions';
import { WhisperService } from './whisper.service';

@Controller('whisper')
export class WhisperController {
  constructor(private readonly whisperService: WhisperService) {}

  @Get('transcription')
  async getAudioTranscription(): Promise<TranscriptionVerbose> {
    return this.whisperService.getAudioTranscriptionFromLocal();
  }

  @Get('read-file')
  async readLocalFile(@Res() response: Response): Promise<void> {
    const file = this.whisperService.readLocalFile();
    file.pipe(response);
  }
}
