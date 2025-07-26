import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TweetModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
