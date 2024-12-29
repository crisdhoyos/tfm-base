import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { EmbeddingService } from '../embedding/embedding.service';
import { Audio } from '../entities';
import { PineconeService } from '../pinecone/pinecone.service';
import { AudiosRepository } from './audios.repository';
import { CreateAudioDto } from './dto';

@Injectable()
export class AudiosService {
  constructor(
    private readonly audiosRepository: AudiosRepository,
    private readonly embeddingService: EmbeddingService,
    private readonly pineconeService: PineconeService,
  ) {}

  async getAllAudios(): Promise<Audio[]> {
    return this.audiosRepository.getAllAudios();
  }

  async searchAudios(text: string): Promise<Audio[]> {
    // Obtiene el embedding del texto
    const embedding = await this.embeddingService.getEmbeddingsFromText([
      { id: 0, text },
    ]);

    // Busca en la BD de vectores
    const results = await this.pineconeService.search(
      embedding[0].tokens,
      1000,
    );

    // Se filtran los ids de los audios encontrados evitando repetidos
    const audioIds = [...new Set(results.map((r) => r.metadata.audioId))];

    // Se obtienen los audios encontrados
    const audios = await this.audiosRepository.getByIds(audioIds);

    // Se ordenan los audios segun el orden de coincidencia (ya vienen ordenados de pinecone)
    const audioMap = new Map(audios.map((audio) => [String(audio.id), audio]));
    return audioIds.map((id) => audioMap.get(String(id)));
  }

  async getAudioById(id: number): Promise<Audio> {
    return this.audiosRepository.getById(id);
  }

  async createAudio(createAudioDto: CreateAudioDto): Promise<Audio> {
    return this.audiosRepository.createAudio(createAudioDto);
  }

  async updateAudio(
    id: number,
    data: Partial<CreateAudioDto>,
  ): Promise<UpdateResult> {
    return this.audiosRepository.updateAudio(id, data);
  }
}
