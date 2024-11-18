import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AudioSegmentsModule } from '../audio-segments/audio-segments.module';
import { AudiosModule } from '../audios/audios.module';
import { WhisperModule } from '../whisper/whisper.module';
import { IndexationDomain } from './indexation.domain';
import { IndexationService } from './indexation.service';

@Module({
  imports: [HttpModule, WhisperModule, AudiosModule, AudioSegmentsModule],
  controllers: [],
  providers: [IndexationService, IndexationDomain],
  exports: [IndexationService, IndexationDomain],
})
export class IndexationModule {}
