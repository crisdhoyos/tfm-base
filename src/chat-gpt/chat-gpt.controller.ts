import { Body, Controller, Post } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';
import { ITranscriptionData } from './interfaces';

@Controller('chat-gpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post('transcription-data')
  async getTranscriptionData(
    @Body() input: { text: string },
  ): Promise<ITranscriptionData> {
    return this.chatGPTService.getTranscriptionData(input.text);
  }
}
