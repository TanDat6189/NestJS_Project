import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async generateImage(text: string): Promise<Buffer> {
    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(text)}`;

    try {
      const response: AxiosResponse<Buffer> = await firstValueFrom(
        this.httpService.get(apiUrl, { responseType: 'arraybuffer' }),
      );

      return response.data;
    } catch (error) {
      throw new Error('Error get image: ' + error.message);
    }
  }
}
