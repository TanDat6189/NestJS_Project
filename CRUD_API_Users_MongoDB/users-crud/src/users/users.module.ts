import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_mongoDB'), // Kết nối MongoDB
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
