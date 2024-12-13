import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../auth/create-user.dto";

@Injectable()
export class UsersService {
    private users = [];

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto,
        };
        this.users.push(newUser);
        return newUser;
    }

    findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}