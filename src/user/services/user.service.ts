import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HashingProvider } from '../../auth/providers/hashing-provider/hashing-provider';
import { Profile } from '../../profile/profile.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async getUsers() {
    const env = this.configService.get<string>('ENV_MODE');
    console.log(env);
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
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

    const newUserPaylaod = {
      ...userDto,
      password: await this.hashingProvider.hashPassword(userDto.password),
    };
    const user = this.userRepository.create(newUserPaylaod);

    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);

    return { message: 'User deleted successfully' };
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    return user;
  }
}
