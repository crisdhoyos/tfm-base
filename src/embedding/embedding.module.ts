import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmbeddingController } from './embedding.controller';
import { EmbeddingDomain } from './embedding.domain';
import { EmbeddingService } from './embedding.service';

@Module({
  imports: [HttpModule],
  controllers: [EmbeddingController],
  providers: [EmbeddingService, EmbeddingDomain],
  exports: [EmbeddingService, EmbeddingDomain],
})
export class EmbeddingModule {}
