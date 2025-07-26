import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers(@Query() query: { [key: string]: string }): User[] | string {
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
    @Body() updateUser: UpdateUserDto,
  ) {
    console.log('Updating user with ID:', id);
    console.log('User updated:', updateUser);
  }

  @Get(':id/tweets')
  getUserTweets(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserTweets(id);
  }
}
