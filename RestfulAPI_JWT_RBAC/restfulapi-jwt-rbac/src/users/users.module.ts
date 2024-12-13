import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'user_table',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Xem dữ liệu MongoDB: mongosh + tên db -> show dbs -> use + tên table -> show collections -> db.tên bảng.find().pretty()
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
