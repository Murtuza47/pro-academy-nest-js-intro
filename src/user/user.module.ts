import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TweetModule } from '../tweet/tweet.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TweetModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
