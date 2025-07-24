import { Controller, Get } from '@nestjs/common';
import { User, UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  @Get()
  getUsers(): User[] {
    const userService = new UserService();
    return userService.getAllUsers();
  }
}
