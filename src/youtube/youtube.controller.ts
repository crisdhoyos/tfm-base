import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('video/:url')
  downloadVideo(@Param('url') url: string): Promise<any> {
    return this.youtubeService.downloadVideoFile(url);
  }
}
