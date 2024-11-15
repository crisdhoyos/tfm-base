import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Audio } from '../entities';
import { AudiosRepository } from './audios.repository';
import { CreateAudioDto } from './dto';

@Injectable()
export class AudiosService {
  constructor(private readonly audiosRepository: AudiosRepository) {}

  async getAllAudios(): Promise<Audio[]> {
    return this.audiosRepository.getAllAudios();
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
