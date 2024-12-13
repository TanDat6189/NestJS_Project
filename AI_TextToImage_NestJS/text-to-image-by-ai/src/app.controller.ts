import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('drawing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generate(@Body('text') text: string, @Res() res: Response) {
    try {
      const imageBuffer = await this.appService.generateImage(text);
      res.set('Content-Type', 'image/jpeg');
      res.send(imageBuffer);
    } catch (error) {
      res.status(500).send({ message: 'Failed to get image' });
    }
  }
}
