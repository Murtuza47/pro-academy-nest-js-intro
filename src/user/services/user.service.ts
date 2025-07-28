import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../../profile/profile.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async createUser(userDto: CreateUserDto) {
    // validate if user already exists with email
    const existingUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (existingUser) {
      return 'User with this email already exists';
    }

    userDto.profile = userDto.profile || {};

    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    await this.userRepository.delete(id);

    if (user?.profile?.id) {
      await this.profileRepository.delete(user?.profile?.id);
    }

    return { message: 'User deleted successfully' };
  }
}
