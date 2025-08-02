import { Injectable } from '@nestjs/common';

import { UserService } from '../../user/services/user.service';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signUpDto: SignUpDto) {
    return await this.userService.createUser(signUpDto);
  }

  login() {}
}
