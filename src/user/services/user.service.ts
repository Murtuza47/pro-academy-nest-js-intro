import { Injectable } from '@nestjs/common';

import { TweetService } from '../../tweet/services/tweet.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly tweetService: TweetService) {}
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example',
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example',
      gender: 'female',
      isMarried: true,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example',
      gender: 'female',
      isMarried: false,
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example',
      gender: 'male',
      isMarried: true,
    },
    {
      id: 5,
      name: 'Charlie White',
      email: 'charlie@example',
      gender: 'male',
      isMarried: false,
    },
  ];

  getAllUsers(query?: { [key: string]: string }): User[] {
    let users = this.users;

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
