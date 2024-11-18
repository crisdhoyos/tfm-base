import * as ytdl from '@distube/ytdl-core';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { IIndexationResult } from '../indexation/interfaces';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('download/:url')
  downloadAudio(@Param('url') url: string): Promise<ytdl.videoFormat> {
    return this.youtubeService.downloadAudioFile(url);
  }

  @Post('index/:url')
  indexAudio(@Param('url') url: string): Promise<IIndexationResult> {
    return this.youtubeService.indexAudio(url);
  }
}
