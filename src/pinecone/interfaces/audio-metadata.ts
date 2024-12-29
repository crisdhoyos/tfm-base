import { RecordMetadata } from '@pinecone-database/pinecone';
import { EmbeddingType } from '../enums';

export interface IAudioMetadata extends RecordMetadata {
  text: string;
  audioId: number;
  type?: EmbeddingType;
}
