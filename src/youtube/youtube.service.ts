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
- crear modulo de la db para hacer un get, post y put de audios
- Usar el modulo de youtube para guardar el audio
  - crear otro endpoint que cree el stream para mandar a whisper
  - después de recibir los datos de whisper, mandar a guardarlo a la db (audio, data y link de youtube) 
- definir qué parámetros se quieren obtener (resumen, keywords, category, topic, etc)
- Mandar transcripción para analizar con chatGPT (crear contexto e intentar pasarle las categorias a chatgpt que ya tengo para que incluya en una de ellas el audio o que cree una nueva categoria, sacar palabras clave, etc)
- guardar analisis
- crear la búsqueda semantica (modulo, usar https://www.pinecone.io/)
- crear vectores y guardarlos, (definir si se debe guardar por keyword o todo junto, según lo que mejore la búsqueda semantica)
- hacer el servicio para comparar 
- hacer función para obtener audios de una playlist (probar integrando la api de youtube y que si se puede se use un webhook o algo así)
- integrar el flujo de youtube descargando un audio con el análisis e indexación del audio

- empezar el desarrollo del front e integrar auth0.com
- integrar los endpoints
- configurar la cloud architecture
- tratar de solucionar el problema de ipv6 de youtube

Ideas:
- tener en postgresql en una tabla los audios y en otra los segments, 
  pero también mandar a guardar a la db de vectores los segmentos y la transcripción
  la sincronización entre las dos db sería usando CQRS

 */

import * as ytdl from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Readable } from 'stream';
import { YoutubeDomain } from './youtube.domain';

@Injectable()
export class YoutubeService {
  constructor(private readonly youtubeDomain: YoutubeDomain) {}

  exampleData = {
    audioFormats: [
      {
        mimeType: 'audio/webm; codecs="opus"',
        qualityLabel: null,
        bitrate: 148413,
        audioBitrate: 160,
        itag: 251,
        url: 'https://rr6---sn-hv8pnu5gjv-javl.googlevideo.com/videoplayback?expire=1729878994&ei=cocbZ6fnHNTGzN0Ps-KxmA8&ip=181.234.153.179&id=o-ALkF1KUv2N0dbJnOI30UgD-RP2XqeR59cCtgd0TLN7_U&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1729857394%2C&mh=TR&mm=31%2C29&mn=sn-hv8pnu5gjv-javl%2Csn-cvb7sn7r&ms=au%2Crdu&mv=m&mvi=6&pl=19&rms=au%2Cau&initcwndbps=553750&spc=qtApAVL_npvauI3swdZ3YIJaaJDujY2WhgCvLDw187oma2AM9un-uw9WFQ&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=3509428&dur=222.921&lmt=1727310682960735&mt=1729856951&fvip=4&keepalive=yes&fexp=51312688%2C51326932&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgVNJdjt97pLm39CNBjyex0xDVQ09FRy0OuCuai982X1ICIAlKvla8DOGIGMCj_FFesqfIF8gwVA_CCWHQojZz1Eyf&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRgIhAMl-RO9MB-vp-BOzsE7hRHtRdKLVIzqv6AtRunsECCNQAiEAtfFTD6NA4kSaulQVbiSkzgtF0DaE3L3dqogKHG9QtPE%3D',
        initRange: {
          start: '0',
          end: '258',
        },
        indexRange: {
          start: '259',
          end: '646',
        },
        lastModified: '1727310682960735',
        contentLength: '3509428',
        quality: 'tiny',
        xtags: 'CggKA2RyYxIBMQ',
        projectionType: 'RECTANGULAR',
        averageBitrate: 125943,
        audioQuality: 'AUDIO_QUALITY_MEDIUM',
        approxDurationMs: '222921',
        audioSampleRate: '48000',
        audioChannels: 2,
        loudnessDb: -7.040001,
        isDrc: true,
        hasVideo: false,
        hasAudio: true,
        container: 'webm',
        codecs: 'opus',
        videoCodec: null,
        audioCodec: 'opus',
        isLive: false,
        isHLS: false,
        isDashMPD: false,
      },
      {
        mimeType: 'audio/mp4; codecs="mp4a.40.2"',
        qualityLabel: null,
        bitrate: 130494,
        audioBitrate: 128,
        itag: 140,
        url: 'https://rr6---sn-hv8pnu5gjv-javl.googlevideo.com/videoplayback?expire=1729878994&ei=cocbZ6fnHNTGzN0Ps-KxmA8&ip=181.234.153.179&id=o-ALkF1KUv2N0dbJnOI30UgD-RP2XqeR59cCtgd0TLN7_U&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1729857394%2C&mh=TR&mm=31%2C29&mn=sn-hv8pnu5gjv-javl%2Csn-cvb7sn7r&ms=au%2Crdu&mv=m&mvi=6&pl=19&rms=au%2Cau&initcwndbps=553750&spc=qtApAVL_npvauI3swdZ3YIJaaJDujY2WhgCvLDw187oma2AM9un-uw9WFQ&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=3609159&dur=222.957&lmt=1727310603081393&mt=1729856951&fvip=4&keepalive=yes&fexp=51312688%2C51326932&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgOaFJiSdK8BYOVb7UMNp3Wg7aKNytNo48gT33UpvvvkoCIDljTdx8wDsCQu1DG63ZdEohse2alnZwiC4e0xvvh3ms&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRgIhAMl-RO9MB-vp-BOzsE7hRHtRdKLVIzqv6AtRunsECCNQAiEAtfFTD6NA4kSaulQVbiSkzgtF0DaE3L3dqogKHG9QtPE%3D',
        initRange: {
          start: '0',
          end: '722',
        },
        indexRange: {
          start: '723',
          end: '1030',
        },
        lastModified: '1727310603081393',
        contentLength: '3609159',
        quality: 'tiny',
        projectionType: 'RECTANGULAR',
        averageBitrate: 129501,
        highReplication: true,
        audioQuality: 'AUDIO_QUALITY_MEDIUM',
        approxDurationMs: '222957',
        audioSampleRate: '44100',
        audioChannels: 2,
        loudnessDb: -7.84,
        hasVideo: false,
        hasAudio: true,
        container: 'mp4',
        codecs: 'mp4a.40.2',
        videoCodec: null,
        audioCodec: 'mp4a.40.2',
        isLive: false,
        isHLS: false,
        isDashMPD: false,
      },
      {
        mimeType: 'audio/mp4; codecs="mp4a.40.2"',
        qualityLabel: null,
        bitrate: 130494,
        audioBitrate: 128,
        itag: 140,
        url: 'https://rr6---sn-hv8pnu5gjv-javl.googlevideo.com/videoplayback?expire=1729878994&ei=cocbZ_zjHPvCzN0Pk7iXmA8&ip=181.234.153.179&id=o-AK4fbk9AnKE74xA3r-jO-BAs5KFZKPunMgjSYIQ0L222&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1729857394%2C&mh=TR&mm=31%2C29&mn=sn-hv8pnu5gjv-javl%2Csn-cvb7sn7r&ms=au%2Crdu&mv=m&mvi=6&pl=19&rms=au%2Cau&initcwndbps=553750&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=3609159&dur=222.957&lmt=1727310603081393&mt=1729856951&fvip=4&keepalive=yes&fexp=51312688%2C51326932&c=IOS&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgB395_vKqK48jrFhGXI2t3t17lov-gnUCL16tqrPTLxMCIQDbIAYCIuoLSNR0EUB1_KLCq0sDDU5-H1WalAp3LyzXXw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRgIhAKncCxUSyUCmPk5_plwVi3rpyP1JChD20-E-sTHsd0QFAiEAsGJ0elgGjAi1iTgwJOLjPMrGFXLone7Zq6r0q-tioYk%3D',
        initRange: {
          start: '0',
          end: '722',
        },
        indexRange: {
          start: '723',
          end: '1030',
        },
        lastModified: '1727310603081393',
        contentLength: '3609159',
        quality: 'tiny',
        projectionType: 'RECTANGULAR',
        averageBitrate: 129501,
        highReplication: true,
        audioQuality: 'AUDIO_QUALITY_MEDIUM',
        approxDurationMs: '222957',
        audioSampleRate: '44100',
        audioChannels: 2,
        loudnessDb: -7.84,
        hasVideo: false,
        hasAudio: true,
        container: 'mp4',
        codecs: 'mp4a.40.2',
        videoCodec: null,
        audioCodec: 'mp4a.40.2',
        isLive: false,
        isHLS: false,
        isDashMPD: false,
      },
    ],
  };

  async downloadVideoFile(url: string): Promise<object> {
    // Se obtienen los formatos de audio disponibles para el video
    const info = await ytdl.getInfo(url);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    // se elige el mejor formato de audio
    const format = this.chooseAudioFormat(audioFormats);
    if (!format) {
      return null;
    }

    // se descarga el audio
    this.saveFileLocally(url, format);

    return Promise.resolve({ format, audioFormats });
  }

  /**
   * Selecciona el audio mp4 con la mejor calidad de audio posible
   * @param formats lista de formatos obtenida del mismo video de youtube
   * @returns Formato elegido
   */
  chooseAudioFormat(formats: ytdl.videoFormat[]): ytdl.videoFormat | null {
    const found = formats
      .sort((a, b) => b.audioBitrate - a.audioBitrate)
      .filter((v) => v.container === 'mp4');
    return found.length ? found[0] : null;
  }

  /**
   * Descarga el archivo de youtube en el formato elegido y lo guarda localmente
   * @param url url de youtube
   * @param format formato elegido
   */
  saveFileLocally(url: string, format: ytdl.videoFormat): void {
    // Se crea el write stream para guardar el audio
    const outputFilePath = `try12.${format.container}`;
    const outputStream = fs.createWriteStream(outputFilePath);
    // se descarga el video desde youtube
    const videoStream = this.downloadVideo(url, format);
    videoStream.pipe(outputStream);
    // cuando se completa, imprime el mensaje de finish
    outputStream.on('finish', () => {
      console.log(`Finished downloading: ${outputFilePath}`);
    });
  }

  /**
   * Descarga el video de youtube y lo devuelve como stream
   * @param url url de youtube
   * @param format formato elegido
   * @returns Readable stream
   */
  downloadVideo(url: string, format: ytdl.videoFormat): Readable {
    return ytdl(url, { format });
  }
}
