import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    void this.userService.createUser(createUser);
    return 'User is created successfully';
  }
}
