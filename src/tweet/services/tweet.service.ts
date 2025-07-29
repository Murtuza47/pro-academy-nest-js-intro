import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Hashtag } from '../../hashtag/hashtag.entity';
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

    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const user = await this.userRepository.findOneBy({
      id: createTweetDto.user_id,
    });
    const hashtags = await this.hashtagRepository.find({
      where: { id: In(createTweetDto.hashtag_ids || []) },
    });

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user!, // Ensure user is not null
      hashtags: hashtags,
    });
    return await this.tweetRepository.save(tweet);
  }
}
