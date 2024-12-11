import { Injectable } from '@nestjs/common';
import { EmbeddingDomain } from './embedding.domain';
import { ISegmentForEmbedding, ISegmentWithEmbedding } from './interfaces';

@Injectable()
export class EmbeddingService {
  constructor(private readonly embeddingDomain: EmbeddingDomain) {}

  async getEmbeddingsFromText(
    segments: ISegmentForEmbedding[],
  ): Promise<ISegmentWithEmbedding[]> {
    // Calcular los tokens por segmento
    // Necesario para evitar rebasar los límites del modelo
    const selected: ISegmentForEmbedding[] = [];
    let totalTokens = 0;
    for (const segment of segments) {
      const tokens = this.embeddingDomain.calculateTokens(segment.text);
      totalTokens += tokens;
      if (totalTokens > 8190) {
        break;
      }
      if (tokens > 0) {
        selected.push(segment);
      }
    }

    // Obtener embeddings para todos los segmentos
    const embeddings = await this.embeddingDomain.getEmbeddings(
      selected.map((segment) => segment.text),
    );

    return embeddings.map(({ embedding, index }) => ({
      ...selected[index],
      tokens: embedding,
    }));
  }
}
