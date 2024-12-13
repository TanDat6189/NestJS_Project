import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserResponse } from '../response/userResponse';
import * as bcrypt from 'bcrypt';
import { UserRegisterRequest } from "../request/userRegisterRequest";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    userRegisterRequest: UserRegisterRequest,
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);
    const newUser = new this.userModel(
      new User({
        email: userRegisterRequest.email,
        password: hashedPassword,
        name: userRegisterRequest.name,
        role: userRegisterRequest.role,
      }),
    );
    const userAdded = newUser.save();
    return new UserResponse({
      id: (await userAdded).id,
      name: (await userAdded).name,
      email: (await userAdded).email,
      role: (await userAdded).role,
    });
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userModel.find().exec();
    return users.map(
      (user) =>
        new UserResponse({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
    );
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.userModel.findById(id).exec();
    return new UserResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  async update(id: string, user: User): Promise<UserResponse> {
    const userUpdated = await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    return new UserResponse({
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      role: userUpdated.role,
    });
  }

  async remove(id: string): Promise<UserResponse> {
    const userDeleted = await this.userModel.findByIdAndDelete(id).exec();
    return new UserResponse({
      id: userDeleted.id,
      name: userDeleted.name,
      email: userDeleted.email,
      role: userDeleted.role,
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).exec();
  }
}
