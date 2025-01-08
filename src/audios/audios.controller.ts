import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Audio } from '../entities';
import { AudiosService } from './audios.service';
import { CreateAudioDto, FilterAllAudiosDto } from './dto';

@Controller('audios')
export class AudiosController {
  constructor(private readonly audiosService: AudiosService) {}

  @Get('')
  getAllAudios(@Query() data?: FilterAllAudiosDto): Promise<Audio[]> {
    return this.audiosService.getAllAudios(data.categoryId);
  }

  @Get('search/:text')
  searchAudios(@Param('text') text: string): Promise<Audio[]> {
    return this.audiosService.searchAudios(text);
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
