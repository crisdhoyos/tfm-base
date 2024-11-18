import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Uploadable } from 'openai/uploads';
import { AudioSegmentsService } from '../audio-segments/audio-segments.service';
import { CreateAudioSegmentDto } from '../audio-segments/dto';
import { AudiosService } from '../audios/audios.service';
import { WhisperService } from '../whisper/whisper.service';
import { IIndexationResult } from './interfaces';

@Injectable()
export class IndexationService {
  constructor(
    private readonly whisperService: WhisperService,
    private readonly audiosService: AudiosService,
    private readonly audioSegmentsService: AudioSegmentsService,
  ) {}

  async indexAudio(
    audioFile: Uploadable | fs.ReadStream,
    url: string,
    audioTitle: string = 'title',
  ): Promise<IIndexationResult> {
    // se manda el audio a whisper y se obtiene la transcripción
    const data = await this.whisperService.getAudioTranscription(audioFile);

    // Guardado en la db
    const audio = await this.audiosService.createAudio({
      name: audioTitle,
      link: url,
      transcription: data.text,
      duration: Number(data.duration),
    });
    const segmentsToSave: CreateAudioSegmentDto[] = data.segments.map(
      (seg) => ({
        audioId: audio.id,
        segmentId: seg.id,
        seek: seg.seek,
        start: seg.start,
        end: seg.end,
        text: seg.text,
        tokens: seg.tokens?.join(','),
        temperature: seg.temperature,
        avgLogprob: seg.avg_logprob,
        compressionRatio: seg.compression_ratio,
        noSpeechProb: seg.no_speech_prob,
      }),
    );
    const segments =
      await this.audioSegmentsService.createAudioSegments(segmentsToSave);
    return { audio, segments };
  }
}
