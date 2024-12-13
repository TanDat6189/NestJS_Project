import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server; // Biến server để phát sự kiện đến tất cả các client

    //Xử lý sự kiện khi client gửi tin nhắn với tên sự kiện 'message'
    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {

        // Phát tin nhắn vừa nhận được đến các client đã kết nối
        this.server.emit('hello', message as any);
    }
}
