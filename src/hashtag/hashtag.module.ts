import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HashtagController } from './controllers/hashtag.controller';
import { Hashtag } from './hashtag.entity';
import { HashtagService } from './services/hashtag.service';

@Module({
  providers: [HashtagService],
  controllers: [HashtagController],
  imports: [TypeOrmModule.forFeature([Hashtag])],
})
export class HashtagModule {}
