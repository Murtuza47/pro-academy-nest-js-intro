import { Module } from '@nestjs/common';

import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';

@Module({
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}
