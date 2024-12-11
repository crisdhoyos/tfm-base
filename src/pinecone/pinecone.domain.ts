import { Injectable } from '@nestjs/common';
import {
  Index,
  Pinecone,
  ScoredPineconeRecord,
} from '@pinecone-database/pinecone';
import { ISavePineconeEmbedding } from './interfaces';
import { PINECONE_NAMESPACE } from './pinecone.constants';

@Injectable()
export class PineconeDomain {
  private readonly pc: Pinecone;
  private readonly pcIndex: Index;

  constructor() {
    this.pc = new Pinecone({
      apiKey: process.env.PINECONE_KEY,
    });
    this.pcIndex = this.pc.index(process.env.PINECONE_INDEX);
  }

  // ESTE SERVICIO NO SE USA porque pinecone utilizaun vector de tamaño 1024, pero los audios están guardados con un tamaño de 1536 que es lo que da Open AI
  /**
   * Retorna un arreglo en la que cada cada posición tiene el arreglo de tokens que se generaron respectivos al arreglo de segmentos dado
   * Por ejemplo, si los segmentos que se dan son estos: ["segmento1","segmento2"]
   * Retornará los valores así: [(array de tokens para el segmento 1), (array de tokens para el segmento 2)]
   * @param segments Arreglo de textos que se desean convertir a tokens
   * @returns 
   */
  // async createEmbeddings(segments: string[]): Promise<Array<number[]>> {
  //   const embeddings = await this.pc.inference.embed(PINECONE_MODEL, segments, {
  //     inputType: 'passage',
  //     truncate: 'END',
  //   });
  //   console.log('Pinecone embeddings tokens used:', embeddings.usage);
  //   return embeddings.data.map((e)=> e.values);
  // }

  async upsertEmbeddings(data: ISavePineconeEmbedding[]): Promise<void> {
    // se prepara la información para guardarla
    // Cada uno debe contener el 'id', los valores del embedding como 'values', y el texto original como 'metadata'
    const records = data.map(({ id, values, text, audioId, type }) => ({
      id,
      values,
      metadata: { text, audioId, type },
    }));

    // Upsert the vectors into the index
    return await this.pcIndex.namespace(PINECONE_NAMESPACE).upsert(records);
  }

  async search(
    searchVector: number[],
    numberOfResults: number = 3,
  ): Promise<ScoredPineconeRecord[]> {
    const result = await this.pcIndex.namespace(PINECONE_NAMESPACE).query({
      topK: numberOfResults,
      vector: searchVector,
      includeValues: false,
      includeMetadata: true,
    });
    console.log('Pinecone read tokens used:', result.usage?.readUnits);
    return result.matches;
  }
}
