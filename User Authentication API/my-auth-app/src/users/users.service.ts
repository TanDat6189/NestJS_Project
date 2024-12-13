import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    private users = [];

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = { username: createUserDto.username, password: hashedPassword };
        this.users.push(newUser);

        return newUser;
    }

    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}