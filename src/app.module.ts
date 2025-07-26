import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TweetModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database: 'pro-academy-nestjs-intro',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
