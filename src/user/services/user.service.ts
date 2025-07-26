import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AuthService } from '../../auth/services/auth.service';
import { TweetService } from '../../tweet/services/tweet.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly tweetService: TweetService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example',
      gender: 'male',
      isMarried: false,
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example',
      gender: 'female',
      isMarried: true,
      password: 'password123',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example',
      gender: 'female',
      isMarried: false,
      password: 'password123',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example',
      gender: 'male',
      isMarried: true,
      password: 'password123',
    },
    {
      id: 5,
      name: 'Charlie White',
      email: 'charlie@example',
      gender: 'male',
      isMarried: false,
      password: 'password123',
    },
  ];

  getAllUsers(query?: { [key: string]: string }): User[] | string {
    let users = this.users;

    if (!this.authService.isAuthenticated) {
      return 'User is not authenticated';
    }

    if (query?.name) {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(query.name.toLowerCase()),
      );
    }

    if (query?.isMarried) {
      users = users.filter(
        (user) => user.isMarried === Boolean(query.isMarried === 'true'),
      );
    }

    if (query?.gender) {
      users = users.filter((user) => user.gender === query.gender);
    }

    return users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto) {
    const userLenght = this.users.length;
    user.id = userLenght + 1;
    this.users.push(user);
  }

  getUserTweets(userId: number) {
    return this.tweetService.getAllTweetsByUserId(userId);
  }
}
