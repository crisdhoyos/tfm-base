import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AudioSegment } from '../entities';
import { CreateAudioSegmentDto } from './dto';

@Injectable()
export class AudioSegmentsRepository {
  constructor(
    @InjectRepository(AudioSegment)
    private readonly repository: Repository<AudioSegment>,
  ) {}

  async getAllAudioSegments(): Promise<AudioSegment[]> {
    return await this.repository.find();
  }

  async getAudioSegmentById(id: number): Promise<AudioSegment> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async createAudioSegments(
    data: CreateAudioSegmentDto[],
  ): Promise<AudioSegment[]> {
    return await this.repository.save(data);
  }

  async updateAudioSegment(
    id: number,
    data: Partial<CreateAudioSegmentDto>,
  ): Promise<UpdateResult> {
    return await this.repository.update({ id }, data);
  }
}
