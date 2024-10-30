import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { YoutubeDomain } from './youtube.domain';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [HttpModule],
  controllers: [YoutubeController],
  providers: [YoutubeService, YoutubeDomain],
})
export class YoutubeModule {}
