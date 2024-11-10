import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhisperModule } from './whisper/whisper.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [YoutubeModule, WhisperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
