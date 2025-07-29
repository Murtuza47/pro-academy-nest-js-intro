import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hashtag } from '../hashtag/hashtag.entity';
import { User } from '../user/user.entity';
import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';
import { Tweet } from './tweet.entity';

@Module({
  providers: [TweetService],
  controllers: [TweetController],
  exports: [TweetService],
  imports: [TypeOrmModule.forFeature([Tweet, User, Hashtag])],
})
export class TweetModule {}
