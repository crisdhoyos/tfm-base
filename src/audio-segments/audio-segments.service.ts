import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { AudioSegment } from '../entities';
import { AudioSegmentsRepository } from './audio-segments.repository';
import { CreateAudioSegmentDto } from './dto';

@Injectable()
export class AudioSegmentsService {
  constructor(
    private readonly audioSegmentsRepository: AudioSegmentsRepository,
  ) {}

  async getAllAudioSegments(): Promise<AudioSegment[]> {
    return this.audioSegmentsRepository.getAllAudioSegments();
  }

  async getAudioSegmentById(id: number): Promise<AudioSegment> {
    return this.audioSegmentsRepository.getAudioSegmentById(id);
  }

  async createAudioSegments(
    data: CreateAudioSegmentDto[],
  ): Promise<AudioSegment[]> {
    return this.audioSegmentsRepository.createAudioSegments(data);
  }

  async updateAudioSegment(
    id: number,
    data: Partial<CreateAudioSegmentDto>,
  ): Promise<UpdateResult> {
    return this.audioSegmentsRepository.updateAudioSegment(id, data);
  }
}
