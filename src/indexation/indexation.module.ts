import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AudioSegmentsModule } from '../audio-segments/audio-segments.module';
import { AudiosModule } from '../audios/audios.module';
import { CategoryModule } from '../category/category.module';
import { ChatGPTModule } from '../chat-gpt/chat-gpt.module';
import { EmbeddingModule } from '../embedding/embedding.module';
import { PineconeModule } from '../pinecone/pinecone.module';
import { WhisperModule } from '../whisper/whisper.module';
import { IndexationDomain } from './indexation.domain';
import { IndexationService } from './indexation.service';

@Module({
  imports: [
    HttpModule,
    WhisperModule,
    AudiosModule,
    AudioSegmentsModule,
    ChatGPTModule,
    CategoryModule,
    EmbeddingModule,
    PineconeModule,
  ],
  controllers: [],
  providers: [IndexationService, IndexationDomain],
  exports: [IndexationService, IndexationDomain],
})
export class IndexationModule {}
