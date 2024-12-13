import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat-gateway";

@Module({
    providers: [ChatGateway], // Đăng ký ChatGateway
})

export class ChatModule {}