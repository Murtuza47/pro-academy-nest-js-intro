import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../user/user.entity';
import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { Tweet } from '../tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const user = await this.userRepository.findOneBy({
      id: createTweetDto.user_id,
    });

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user!, // Ensure user is not null
    });
    return await this.tweetRepository.save(tweet);
  }
}
