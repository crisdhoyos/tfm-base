import { Injectable } from '@nestjs/common';
import { ChatGPTDomain } from './chat-gpt.domain';
import { ITranscriptionData } from './interfaces';
import { toTranscriptionData } from './mappers';

@Injectable()
export class ChatGPTService {
  constructor(private readonly chatGPTDomain: ChatGPTDomain) {}

  async getTranscriptionData(
    text: string,
    categories: Array<string> = [],
  ): Promise<ITranscriptionData> {
    const prompt = `
    A continuación, se proporciona la transcripción de un podcast. Necesito que analices esta transcripción y generes lo siguiente:

    1. Un resumen breve del contenido.
    2. Una lista de palabras clave relevantes relacionadas con los temas tratados.
    3. Una lista de categorías:
      - Primero, verifica si la transcripción encaja en algunas de las categorías proporcionadas a continuación.
      - Si no encaja, sugiere nuevas categorías adecuadas para describir el contenido (o solo sugiere 1 categoría nueva de ser necesario).

    Devuelve los resultados en el siguiente formato JSON:
    {
      "resumen": "Texto del resumen aquí",
      "palabras_clave": ["palabra1", "palabra2", "palabra3"],
      "categorias": ["categoría1", "categoría2"]
    }
    Es importante que la respuesta sea directamente el JSON stringify plano, empezando por el simbolo { y terminando por el simbolo }
    Elimina el \`\`\`json\\n del principio y el \\n\`\`\` del final

    Categorías predefinidas: 
    ${categories}

    Transcripción:
    ${text}
    `;
    const result = await this.chatGPTDomain.executePrompt(prompt);
    const parsed = JSON.parse(result.choices[0].message.content);
    return toTranscriptionData(parsed);
  }
}
