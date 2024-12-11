/**
Links:
https://www.youtube.com/watch?v=H9KESr_ceJs
https://www.npmjs.com/package/ytdl-core#how-does-using-an-ipv6-block-help
https://github.com/fent/node-ytdl-core/blob/master/example/ipv6_rotating.js
https://stackoverflow.com/questions/45555960/nodejs-fluent-ffmpeg-cannot-find-ffmpeg
https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg

https://youtu.be/W2YwMuxzyJY?si=DMwxdRTMLf7pZeYm

https://www.pinecone.io/
https://milvus.io/


To do:
x integrar ChatGPT Whisper
x Probar a transcribir un audio (qué formato debería tener? un buffer? o un stream?)
x Crear la DB en postgresql
x configurar typeorm
x crear entidad de audios
x crear entidad de segments
x configurar migrations
x crear la tabla para los audios (con migrations)
x hacer la foreing key entre audios y segments (migration y entities)
x crear modulo de la db para hacer un get, post y put de audios
x Usar el modulo de youtube para guardar el audio
  x crear otro endpoint que cree el stream para mandar a whisper
  x después de recibir los datos de whisper, mandar a guardarlo a la db (audio, data y link de youtube) 
x definir qué parámetros se quieren obtener (resumen, keywords, category, topic, etc)
x Mandar transcripción para analizar con chatGPT (crear contexto e intentar pasarle las categorias a chatgpt que ya tengo para que incluya en una de ellas el audio o que cree una nueva categoria, sacar palabras clave, etc)
x Crear modulo de embeddings con un metodo que reciba un array de textos y devuelva los embeddings calculados
- crear la búsqueda semantica (modulo, usar https://www.pinecone.io/)
- crear vectores y guardarlos, (definir si se debe guardar por keyword o todo junto, según lo que mejore la búsqueda semantica)
- guardar analisis completo (analisis de chatgpt y embeddings) en el modulo de index
- hacer el servicio para comparar 
- hacer función para obtener audios de una playlist (probar integrando la api de youtube y que si se puede se use un webhook o algo así)
- integrar el flujo de youtube descargando un audio con el análisis e indexación del audio

- empezar el desarrollo del front e integrar auth0.com
- integrar los endpoints
- configurar la cloud architecture
- tratar de solucionar el problema de ipv6 de youtube

Notas:
- En pinecone se puede definir qué modelo de embedding se quiere usar, por ejemplo, para el de OpenAI ha que decirle a pinecone esto:
embedding_model: text-embedding-ada-002

Ideas:
- Se podría poner en la tabla audios un type para saber si viene desde youtube o desde un archivo directo
- Para audios muy pesados buscar la manera de hacer el proceso en baches (ya que whisper no admite archivos muy grandes)
- tener en postgresql en una tabla los audios y en otra los segments, 
  pero también mandar a guardar a la db de vectores los segmentos y la transcripción
  la sincronización entre las dos db sería usando CQRS

  Videos cortos:

  pibe:
  https://www.youtube.com/shorts/rM2Aqdde-XI
  youtube:
  https://www.youtube.com/shorts/r1uIqoJls0k
  cafe:
  https://www.youtube.com/watch?v=WFfFO3U17HU

 */

import * as ytdl from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';
import { IndexationService } from '../indexation/indexation.service';
import { IIndexationResult } from '../indexation/interfaces';
import {
  downloadVideo,
  getAudioFormat,
  getAudioInfo,
  readableToBuffer,
  saveFileLocally,
} from './utils';

@Injectable()
export class YoutubeService {
  constructor(private readonly indexationService: IndexationService) {}

  /**
   * Funcion enfocada a probar la url de youtube para descargar el audio y guardarlo localmente
   * @param url url del video de youtube (admite shorts también)
   * @returns
   */
  async downloadAudioFile(url: string): Promise<ytdl.videoFormat> {
    // Se obtienen los formatos de audio disponibles para el video
    const info = await getAudioInfo(url);
    const format = await getAudioFormat(info);
    // se obtiene el stream del audio
    const audioStream = downloadVideo(url, format);

    // se descarga el audio localmente
    await saveFileLocally(audioStream, format);

    return format;
  }

  /**
   * Descarga el video de youtube, lo procesa con whisper y guarda los datos en la DB
   * @param url
   */
  async indexAudio(url: string): Promise<IIndexationResult> {
    // Se obtienen la info y los formatos de audio disponibles para el video
    const info = await getAudioInfo(url);
    const audioTitle = info.videoDetails?.title || 'title';
    const format = await getAudioFormat(info);
    // se obtiene el stream del audio para convertirlo a buffer
    const audioStream = downloadVideo(url, format);
    const audioBuffer = await readableToBuffer(audioStream, audioTitle);

    return await this.indexationService.indexAudio(
      audioBuffer,
      url,
      audioTitle,
    );
  }
}
