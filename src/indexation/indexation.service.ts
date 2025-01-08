import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Uploadable } from 'openai/uploads';
import { AudioSegmentsService } from '../audio-segments/audio-segments.service';
import { CreateAudioSegmentDto } from '../audio-segments/dto';
import { AudiosService } from '../audios/audios.service';
import { CategoryService } from '../category/category.service';
import { ChatGPTService } from '../chat-gpt/chat-gpt.service';
import { EmbeddingService } from '../embedding/embedding.service';
import { EmbeddingType } from '../pinecone/enums';
import { PineconeService } from '../pinecone/pinecone.service';
import { WhisperService } from '../whisper/whisper.service';
import { IIndexationResult } from './interfaces';

@Injectable()
export class IndexationService {
  constructor(
    private readonly whisperService: WhisperService,
    private readonly audiosService: AudiosService,
    private readonly audioSegmentsService: AudioSegmentsService,
    private readonly chatGPTService: ChatGPTService,
    private readonly categoryService: CategoryService,
    private readonly embeddingService: EmbeddingService,
    private readonly pineconeService: PineconeService,
  ) {}

  async indexAudio(
    audioFile: Uploadable | fs.ReadStream,
    url: string,
    audioTitle: string = 'title',
    youtubeId: string = '',
  ): Promise<IIndexationResult> {
    // se manda el audio a whisper y se obtiene la transcripción
    const data = await this.whisperService.getAudioTranscription(audioFile);

    // se consultan las categorias que ya existen
    const categories = await this.categoryService.getAllCategories();

    // se obtiene el analisis del audio
    const analysis = await this.chatGPTService.getTranscriptionData(
      data.text,
      categories.map((c) => c.name),
    );

    // se crean las categorias que no existan
    const categoriesCreated = await this.categoryService.createCategories(
      analysis.topics,
    );

    // se obtiene el embedding de la transcripcion y de los segmentos
    const embeddingsAudio = await this.embeddingService.getEmbeddingsFromText([
      { id: 0, text: data.text },
    ]);
    const embeddingsSegments =
      await this.embeddingService.getEmbeddingsFromText(
        data.segments.map((s) => ({ id: s.id, text: s.text })),
      );

    // Guardado en la db del audio y los segmentos
    const audio = await this.audiosService.createAudio({
      name: audioTitle,
      link: url,
      youtubeId,
      transcription: data.text,
      duration: Number(data.duration),
      categories: categoriesCreated,
      description: analysis.summary,
      keywords: analysis.keywords.join(','),
      tokens: embeddingsAudio[0].tokens.join(','),
    });
    const segmentsToSave: CreateAudioSegmentDto[] = data.segments.map(
      (seg, index) => ({
        audioId: audio.id,
        segmentId: seg.id,
        seek: seg.seek,
        start: seg.start,
        end: seg.end,
        text: seg.text,
        tokens: embeddingsSegments[index].tokens.join(','),
        temperature: seg.temperature,
        avgLogprob: seg.avg_logprob,
        compressionRatio: seg.compression_ratio,
        noSpeechProb: seg.no_speech_prob,
      }),
    );
    const segments =
      await this.audioSegmentsService.createAudioSegments(segmentsToSave);

    // se guarda en pinecone los vectores
    await this.pineconeService.upsertEmbeddings([
      {
        id: `audio-${audio.id}`,
        audioId: audio.id,
        text: audio.transcription,
        values: embeddingsAudio[0].tokens,
        type: EmbeddingType.AUDIO,
      },
      ...segments.map((seg, index) => ({
        id: `${seg.id}`,
        audioId: seg.audioId,
        text: seg.text,
        values: embeddingsSegments[index].tokens,
        type: EmbeddingType.SEGMENT,
      })),
    ]);
    return { audio, segments };
  }
}
