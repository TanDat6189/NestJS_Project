import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {UsersService} from "../users/users.service";
import { CreateUserDto } from "./create-user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedPasswordHash);
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(CreateUserDto);
        return user;
    }

    async validateUser(username: string, password: string):Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { user: user.username, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
