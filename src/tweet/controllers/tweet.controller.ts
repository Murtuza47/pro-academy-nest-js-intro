import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PaginationDto } from '../../common/pagination/dtos/pagination.dto';
import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { UpdateTweetDto } from '../dtos/update-tweet.dto';
import { TweetService } from '../services/tweet.service';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  getTweets(@Query() paginationDto: PaginationDto) {
    return this.tweetService.getTweets(paginationDto);
  }

  @Post()
  createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }

  @Patch()
  updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updateTweet(updateTweetDto);
  }

  @Delete(':id')
  deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
