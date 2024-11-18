import * as ytdl from '@distube/ytdl-core';
import * as fs from 'fs';
import { Readable } from 'stream';

/**
 * Descarga el archivo de youtube en el formato elegido y lo guarda localmente
 * @param url url de youtube
 * @param format formato elegido
 * @param fileName nombre con el que se guardará el archivo
 */
export const saveFileLocally = async (
  videoStream: Readable,
  format: ytdl.videoFormat,
  fileName: string = 'downloaded',
): Promise<void> => {
  // Se crea el write stream para guardar el audio
  const outputFilePath = `${fileName}.${format.container}`;
  const outputStream = fs.createWriteStream(outputFilePath);
  // se descarga el video desde youtube
  videoStream.pipe(outputStream);
  // cuando se completa, imprime el mensaje de finish
  outputStream.on('finish', () => {
    console.log(`Finished downloading: ${outputFilePath}`);
  });
};
