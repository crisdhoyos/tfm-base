import * as ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';

/**
 * Descarga el video de youtube y lo devuelve como stream
 * @param url url de youtube
 * @param format formato elegido
 * @returns Readable stream
 */
export const downloadVideo = (
  url: string,
  format: ytdl.videoFormat,
): Readable => {
  return ytdl(url, { format });
};
