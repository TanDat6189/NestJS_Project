import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ChatModule} from './chat-gateway/chat-gateway.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ChatModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'src/public'),  // Đường dẫn đến thư mục public chứa file HTML
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
