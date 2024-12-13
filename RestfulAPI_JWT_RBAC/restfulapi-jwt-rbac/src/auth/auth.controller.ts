import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequest } from '../request/userLoginRequest';
import { UserRegisterRequest } from '../request/userRegisterRequest';
import { Public } from './guard/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() userLoginRequest: UserLoginRequest): Promise<any> {
    return this.authService.login(userLoginRequest);
  }

  @Public()
  @Post('register')
  register(@Body() userRegisterRequest: UserRegisterRequest): Promise<any> {
    return this.authService.register(userRegisterRequest);
  }
}
