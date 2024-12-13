import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import {AuthService} from "./auth.service";
import { CreateUserDto } from "./create-user.dto";
import { LoginDto } from "./login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const hashPassword = await this.authService.hashPassword(createUserDto.password);

        //Lưu người dùng với mật khẩu đã mã hóa
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

}
