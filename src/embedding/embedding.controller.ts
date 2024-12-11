import { Body, Controller, Post } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { ISegmentForEmbedding, ISegmentWithEmbedding } from './interfaces';

@Controller('embeddings')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Post('')
  async getEmbeddingsFromText(
    @Body() input: { texts: ISegmentForEmbedding[] },
  ): Promise<ISegmentWithEmbedding[]> {
    return this.embeddingService.getEmbeddingsFromText(input.texts);
  }
}
