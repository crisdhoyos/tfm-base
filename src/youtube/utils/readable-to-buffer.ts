import { Blob } from 'buffer';
import { File } from 'node:buffer';
import { Readable } from 'stream';

/**
 * Convierte un stream de tipo Readable en un buffer
 * @param readable stream de tipo Readable
 * @returns
 */
export const readableToBuffer = async (
  readable: Readable,
  fileName: string,
  mimeType: string = 'audio/mp4',
): Promise<File> => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  const blob = new Blob(chunks, { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};
