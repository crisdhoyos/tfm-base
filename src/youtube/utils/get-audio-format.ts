import * as ytdl from '@distube/ytdl-core';
import { chooseAudioFormat } from './choose-format';

/**
 * Obtiene el mejor formato de audio mp4 posible para el video seleccionado
 * @param url url del video de youtube (admite shorts también)
 * @returns stream del audio
 */
export const getAudioFormat = async (
  audioInfo: ytdl.videoInfo,
): Promise<ytdl.videoFormat> => {
  // Se obtienen los formatos de audio disponibles para el video
  let audioFormats = ytdl.filterFormats(audioInfo.formats, 'audioonly');

  // se elige el mejor formato de audio
  const format = chooseAudioFormat(audioFormats);
  return format || null;
};
