import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { AudioSegment } from '../entities';
import { AudioSegmentsService } from './audio-segments.service';
import { CreateAudioSegmentDto, CreateMultipleAudioSegmentsDto } from './dto';

@Controller('audio-segments')
export class AudioSegmentsController {
  constructor(private readonly audioSegmentsService: AudioSegmentsService) {}

  @Get('')
  getAllAudioSegments(): Promise<AudioSegment[]> {
    return this.audioSegmentsService.getAllAudioSegments();
  }

  @Get(':id')
  getAudioSegmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AudioSegment> {
    return this.audioSegmentsService.getAudioSegmentById(id);
  }

  @Post('')
  createAudioSegments(
    @Body() createAudioDto: CreateMultipleAudioSegmentsDto,
  ): Promise<AudioSegment[]> {
    return this.audioSegmentsService.createAudioSegments(
      createAudioDto.segments,
    );
  }

  @Put(':id')
  updateAudioSegment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateAudioSegmentDto>,
  ): Promise<UpdateResult> {
    return this.audioSegmentsService.updateAudioSegment(id, data);
  }
}
