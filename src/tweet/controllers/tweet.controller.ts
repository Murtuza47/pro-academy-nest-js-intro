import { Body, Controller, Post } from '@nestjs/common';

import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { TweetService } from '../services/tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }
}
