import { Body, Controller, Patch, Post } from '@nestjs/common';

import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { UpdateTweetDto } from '../dtos/update-tweet.dto';
import { TweetService } from '../services/tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }

  @Patch()
  updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updateTweet(updateTweetDto);
  }
}
