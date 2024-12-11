import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatGPTController } from './chat-gpt.controller';
import { ChatGPTDomain } from './chat-gpt.domain';
import { ChatGPTService } from './chat-gpt.service';

@Module({
  imports: [HttpModule],
  controllers: [ChatGPTController],
  providers: [ChatGPTService, ChatGPTDomain],
  exports: [ChatGPTService, ChatGPTDomain],
})
export class ChatGPTModule {}
