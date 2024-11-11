import { Controller, Get, Param } from '@nestjs/common';
import { Audio } from '../entities';
import { AudiosService } from './audios.service';

@Controller('audios')
export class AudiosController {
  constructor(private readonly audiosService: AudiosService) {}

  @Get(':id')
  downloadVideo(@Param('id') id: string): Promise<Audio> {
    return this.audiosService.getAudioById(parseInt(id));
  }
}
