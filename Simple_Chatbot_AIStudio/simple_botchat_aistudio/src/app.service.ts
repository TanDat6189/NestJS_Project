import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // Khởi tạo Google Generative AI với API key từ biến môi trường
    this.genAI = new GoogleGenerativeAI(
      'AIzaSyCyHjPLmTTZ17jSXBNIDRhm9p8nVcZBYv8',
    );
  }

  async getChatResponse(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  }
}
