import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PineconeController } from './pinecone.controller';
import { PineconeDomain } from './pinecone.domain';
import { PineconeService } from './pinecone.service';

@Module({
  imports: [HttpModule],
  controllers: [PineconeController],
  providers: [PineconeService, PineconeDomain],
  exports: [PineconeService, PineconeDomain],
})
export class PineconeModule {}
