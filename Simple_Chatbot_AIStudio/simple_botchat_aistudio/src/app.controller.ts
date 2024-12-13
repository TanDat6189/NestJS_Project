import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getChatResponse(@Body() body: { prompt }) {
    const answer = await this.appService.getChatResponse(body.prompt);
    return { answer: answer };
  }
}
