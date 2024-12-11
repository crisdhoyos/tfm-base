import { ISavePineconeEmbedding } from './save-pinecone-embedding';

export interface ISearchPineconeResult {
  id: string;
  score?: number;
  values: number[];
  sparseValues: number[];
  metadata: Partial<ISavePineconeEmbedding>;
}
