import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudiosModule } from './audios/audios.module';
import { typeormConfig } from './config/typeorm/typeorm.config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
