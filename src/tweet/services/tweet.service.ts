import { Injectable } from '@nestjs/common';

import { TweetDto } from '../dtos/tweet.dto';

@Injectable()
export class TweetService {
  constructor() {}
  tweets: TweetDto[] = [
    { id: 1, content: 'Hello World', userId: 1, createdAt: new Date() },
    { id: 2, content: 'NestJS is great!', userId: 1, createdAt: new Date() },
    { id: 3, content: 'Learning NestJS', userId: 2, createdAt: new Date() },
    { id: 4, content: 'TypeScript rocks!', userId: 2, createdAt: new Date() },
  ];

  getAllTweetsByUserId(userId: number): TweetDto[] {
    return this.tweets.filter((tweet) => tweet.userId === userId);
  }
}
