import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Audio } from '../entities';
import { CreateAudioDto } from './dto';

@Injectable()
export class AudiosRepository {
  constructor(
    @InjectRepository(Audio)
    private readonly repository: Repository<Audio>,
  ) {}

  async getAllAudios(): Promise<Audio[]> {
    return await this.repository.find({
      relations: {
        audioSegments: true,
      },
    });
  }

  async getById(id: number): Promise<Audio> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        audioSegments: true,
      },
    });
  }

  async createAudio(createAudioDto: CreateAudioDto): Promise<Audio> {
    return await this.repository.save(createAudioDto);
  }

  async updateAudio(
    id: number,
    data: Partial<CreateAudioDto>,
  ): Promise<UpdateResult> {
    return await this.repository.update({ id }, data);
  }
}