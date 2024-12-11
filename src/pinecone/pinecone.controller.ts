import { Body, Controller, Post } from '@nestjs/common';
import { ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { ISavePineconeEmbedding } from './interfaces';
import { PineconeService } from './pinecone.service';

@Controller('pinecone')
export class PineconeController {
  constructor(private readonly pineconeService: PineconeService) {}

  @Post('')
  async upsertEmbeddings(
    @Body() input: { data: ISavePineconeEmbedding[] },
  ): Promise<void> {
    return this.pineconeService.upsertEmbeddings(input.data);
  }

  // @Post('embeddings')
  // async createEmbeddings(
  //   @Body() input: { data: string[] },
  // ): Promise<Array<number[]>> {
  //   return this.pineconeService.createEmbeddings(input.data);
  // }

  @Post('search')
  async search(
    @Body() input: { searchVector: number[] },
  ): Promise<ScoredPineconeRecord[]> {
    return this.pineconeService.search(input.searchVector);
  }
}
