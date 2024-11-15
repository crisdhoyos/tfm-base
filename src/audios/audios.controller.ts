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
import { Audio } from '../entities';
import { AudiosService } from './audios.service';
import { CreateAudioDto } from './dto';

@Controller('audios')
export class AudiosController {
  constructor(private readonly audiosService: AudiosService) {}

  @Get('')
  getAllAudios(): Promise<Audio[]> {
    return this.audiosService.getAllAudios();
  }

  @Get(':id')
  getAudioById(@Param('id', ParseIntPipe) id: number): Promise<Audio> {
    return this.audiosService.getAudioById(id);
  }

  @Post('')
  createAudio(@Body() createAudioDto: CreateAudioDto): Promise<Audio> {
    return this.audiosService.createAudio(createAudioDto);
  }

  @Put(':id')
  updateAudio(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateAudioDto>,
  ): Promise<UpdateResult> {
    return this.audiosService.updateAudio(id, data);
  }
}
