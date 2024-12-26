import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioSegmentsModule } from './audio-segments/audio-segments.module';
import { AudiosModule } from './audios/audios.module';
import { CategoryModule } from './category/category.module';
import { ChatGPTModule } from './chat-gpt/chat-gpt.module';
import { typeormConfig } from './config/typeorm/typeorm.config';
import { EmbeddingModule } from './embedding/embedding.module';
import { IndexationModule } from './indexation/indexation.module';
import { PineconeModule } from './pinecone/pinecone.module';
import { WhisperModule } from './whisper/whisper.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    YoutubeModule,
    WhisperModule,
    AudiosModule,
    AudioSegmentsModule,
    IndexationModule,
    ChatGPTModule,
    EmbeddingModule,
    PineconeModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
