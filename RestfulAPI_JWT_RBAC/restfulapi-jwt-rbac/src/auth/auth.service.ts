import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserResponse } from '../response/userResponse';
import { UserLoginRequest } from '../request/userLoginRequest';
import { UserRegisterRequest } from '../request/userRegisterRequest';
import * as http from "http";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginRequest: UserLoginRequest): Promise<any> {
    const user = await this.usersService.findOneByEmail(userLoginRequest.email);
    if (
      user &&
      (await bcrypt.compare(userLoginRequest.password, user.password))
    ) {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return new UnauthorizedException('Your email or password is incorrect!!!');
  }

  async register(
    userRegisterRequest: UserRegisterRequest,
  ): Promise<UserResponse> {
    return this.usersService.create(userRegisterRequest);
  }
}
