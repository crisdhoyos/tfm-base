import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WhisperController } from './whisper.controller';
import { WhisperDomain } from './whisper.domain';
import { WhisperService } from './whisper.service';

@Module({
  imports: [HttpModule],
  controllers: [WhisperController],
  providers: [WhisperService, WhisperDomain],
  exports: [WhisperService, WhisperDomain],
})
export class WhisperModule {}
