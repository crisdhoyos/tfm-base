import { IGPTTranscriptionData, ITranscriptionData } from '../interfaces';

export const toTranscriptionData = (
  gptData: IGPTTranscriptionData,
): ITranscriptionData => ({
  summary: gptData.resumen,
  keywords: gptData.palabras_clave,
  topics: gptData.categorias,
});
