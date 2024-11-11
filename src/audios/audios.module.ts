import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio, AudioSegment } from '../entities';
import { AudiosController } from './audios.controller';
import { AudiosRepository } from './audios.repository';
import { AudiosService } from './audios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audio, AudioSegment])],
  controllers: [AudiosController],
  providers: [AudiosService, AudiosRepository],
  exports: [AudiosService, AudiosRepository],
})
export class AudiosModule {}
