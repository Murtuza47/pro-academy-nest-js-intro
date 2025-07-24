import { Controller, Get, Param, Query } from '@nestjs/common';
import { User, UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  @Get()
  getUsers(@Query() query: { [key: string]: string }): User[] {
    const userService = new UserService();
    return userService.getAllUsers(query);
  }

  @Get(':id')
  getUserById(@Param() param: { id: string }): User | undefined {
    const userService = new UserService();
    return userService.getUserById(+param.id);
  }
}
