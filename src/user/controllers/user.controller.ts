import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    void this.userService.createUser(createUser);
    return 'User is created successfully';
  }
}
