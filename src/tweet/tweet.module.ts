import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hashtag } from '../hashtag/hashtag.entity';
import { User } from '../user/user.entity';
import { tweetConfig } from './config/tweet.config';
import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';
import { Tweet } from './tweet.entity';

@Module({
  providers: [TweetService],
  controllers: [TweetController],
  exports: [TweetService],
  imports: [
    ConfigModule.forFeature(tweetConfig),
    TypeOrmModule.forFeature([Tweet, User, Hashtag]),
  ],
})
export class TweetModule {}
