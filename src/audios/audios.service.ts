import { Injectable } from '@nestjs/common';
import { Audio } from '../entities';
import { AudiosRepository } from './audios.repository';

@Injectable()
export class AudiosService {
  constructor(private readonly audiosRepository: AudiosRepository) {}

  async getAudioById(id: number): Promise<Audio> {
    return this.audiosRepository.getById(id);
  }
}
