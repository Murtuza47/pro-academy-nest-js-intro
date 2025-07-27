import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    // validate if user already exists with email
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (user) {
      return 'User with this email already exists';
    }

    return this.userRepository.save(userDto);
  }
}
