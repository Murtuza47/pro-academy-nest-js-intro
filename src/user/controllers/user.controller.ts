import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  @Get()
  getUsers(@Query() query: { [key: string]: string }): User[] {
    const userService = new UserService();
    return userService.getAllUsers(query);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User | undefined {
    const userService = new UserService();
    return userService.getUserById(id);
  }
}
