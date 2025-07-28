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

  async createUser(userDto: CreateUserDto) {
    // validate if user already exists with email
    const existingUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (existingUser) {
      return 'User with this email already exists';
    }

    userDto.profile = userDto.profile || {};

    // create a new user profile
    let profile = this.profileRepository.create(userDto.profile);
    profile = await this.profileRepository.save(profile);

    const user = this.userRepository.create(userDto);
    user.profile = profile;

    return this.userRepository.save(user);
  }
}
