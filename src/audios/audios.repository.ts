import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio } from '../entities';

@Injectable()
export class AudiosRepository {
  constructor(
    @InjectRepository(Audio)
    private readonly repository: Repository<Audio>,
  ) {}

  async getById(id: number): Promise<Audio> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        audioSegments: true,
      },
    });
  }
}
