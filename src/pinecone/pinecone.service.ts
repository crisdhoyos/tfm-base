import { Injectable } from '@nestjs/common';
import { ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { ISavePineconeEmbedding } from './interfaces';
import { PineconeDomain } from './pinecone.domain';

@Injectable()
export class PineconeService {
  constructor(private readonly pineconeDomain: PineconeDomain) {}

  async upsertEmbeddings(data: ISavePineconeEmbedding[]): Promise<void> {
    return await this.pineconeDomain.upsertEmbeddings(data);
  }

  // async createEmbeddings(segments: string[]): Promise<Array<number[]>> {
  //   return await this.pineconeDomain.createEmbeddings(segments);
  // }

  async search(searchVector: number[], numberOfResults: number = 3): Promise<ScoredPineconeRecord[]> {
    return await this.pineconeDomain.search(searchVector, numberOfResults);
  }

}
