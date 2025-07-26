import { Module } from '@nestjs/common';

import { TweetModule } from '../tweet/tweet.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TweetModule],
})
export class UserModule {}
