import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbeddingModule } from '../embedding/embedding.module';
import { Audio, AudioSegment } from '../entities';
import { PineconeModule } from '../pinecone/pinecone.module';
import { AudiosController } from './audios.controller';
import { AudiosRepository } from './audios.repository';
import { AudiosService } from './audios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Audio, AudioSegment]),
    EmbeddingModule,
    PineconeModule,
  ],
  controllers: [AudiosController],
  providers: [AudiosService, AudiosRepository],
  exports: [AudiosService, AudiosRepository],
})
export class AudiosModule {}
