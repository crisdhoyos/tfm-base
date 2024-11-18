import * as ytdl from '@distube/ytdl-core';

/**
 * Obtiene la información del video de youtube
 * @param url url del video de youtube (admite shorts también)
 * @returns stream del audio
 */
export const getAudioInfo = async (url: string): Promise<ytdl.videoInfo> => {
  return await ytdl.getInfo(url);
};
