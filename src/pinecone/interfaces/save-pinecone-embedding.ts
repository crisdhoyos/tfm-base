import { EmbeddingType } from '../enums';

export interface ISavePineconeEmbedding {
  id: string;
  values: number[];
  text: string;
  audioId: number;
  type?: EmbeddingType;
}
