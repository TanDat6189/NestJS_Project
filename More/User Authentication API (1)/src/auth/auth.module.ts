import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: 'randomString1234567890!@#',
        signOptions: { expiresIn: '60s'}, //Thời gian hết hạn của token
      }),
      UsersModule,
  ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
