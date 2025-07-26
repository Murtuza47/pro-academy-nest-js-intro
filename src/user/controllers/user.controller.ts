import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers(@Query() query: { [key: string]: string }): User[] {
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User | undefined {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    this.userService.createUser(createUser);
    console.log('User created:', createUser);
    return 'User is created successfully';
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto
  ) {
    console.log('Updating user with ID:', id);
    console.log('User updated:', updateUser);
  }
}
