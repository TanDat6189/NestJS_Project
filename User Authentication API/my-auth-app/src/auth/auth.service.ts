import { Injectable, UnauthorizedException} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async register(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findOne(loginDto.username);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = {username: user.username}
        return { access_token: this.jwtService.sign(payload) }
    }
}
