import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio, AudioSegment } from '../entities';
import { AudioSegmentsController } from './audio-segments.controller';
import { AudioSegmentsRepository } from './audio-segments.repository';
import { AudioSegmentsService } from './audio-segments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audio, AudioSegment])],
  controllers: [AudioSegmentsController],
  providers: [AudioSegmentsService, AudioSegmentsRepository],
  exports: [AudioSegmentsService, AudioSegmentsRepository],
})
export class AudioSegmentsModule {}
