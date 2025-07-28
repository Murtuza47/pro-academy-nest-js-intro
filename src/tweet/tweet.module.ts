import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';
import { Tweet } from './tweet.entity';

@Module({
  providers: [TweetService],
  controllers: [TweetController],
  exports: [TweetService],
  imports: [TypeOrmModule.forFeature([Tweet])],
})
export class TweetModule {}
