import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginatedPayload } from 'src/common/pagination/interface/paginated-payload.interface';
import { In, Repository } from 'typeorm';

import { PaginationDto } from '../../common/pagination/dtos/pagination.dto';
import { PaginationProvider } from '../../common/pagination/provider/pagination';
import { Hashtag } from '../../hashtag/hashtag.entity';
import { User } from '../../user/user.entity';
import { tweetConfig } from '../config/tweet.config';
import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { UpdateTweetDto } from '../dtos/update-tweet.dto';
import { Tweet } from '../tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,

    @Inject(tweetConfig.KEY)
    private readonly tweetConfiguration: ConfigType<typeof tweetConfig>,
  ) {}

  async getTweets(
    paginationDto: PaginationDto,
  ): Promise<IPaginatedPayload<Tweet>> {
    console.log(this.tweetConfiguration.tweetApiKey);

    return this.paginationProvider.paginatedQuery<Tweet>({
      paginationDto,
      repository: this.tweetRepository,
      relations: {
        user: true,
        hashtags: true,
      },
    });
  }

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

  async updateTweet(updateTweetDto: UpdateTweetDto): Promise<Tweet | string> {
    const hashtags = await this.hashtagRepository.find({
      where: { id: In(updateTweetDto.hashtag_ids || []) },
    });

    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });

    if (tweet) {
      tweet.content = updateTweetDto.content ?? tweet?.content;
      tweet.image = updateTweetDto.image ?? tweet?.image;
      tweet.hashtags = hashtags;
      return await this.tweetRepository.save(tweet);
    }
    return 'Tweet not found';
  }

  async deleteTweet(id: number): Promise<string> {
    await this.tweetRepository.delete(id);

    return 'Tweet deleted successfully';
  }
}
