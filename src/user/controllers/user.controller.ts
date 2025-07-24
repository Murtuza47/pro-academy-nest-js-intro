import { Controller, Get, Param } from '@nestjs/common';
import { User, UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  @Get()
  getUsers(): User[] {
    const userService = new UserService();
    return userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() param: { id: string }): User | undefined {
    console.log('Fetching user with ID:', param.id);
    const userService = new UserService();
    return userService.getUserById(+param.id);
  }
}
