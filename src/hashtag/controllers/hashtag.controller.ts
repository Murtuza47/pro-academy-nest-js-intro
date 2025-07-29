import { Body, Controller, Post } from '@nestjs/common';

import { CreateHashtagDto } from '../dtos/create-hashtag.dto';
import { HashtagService } from '../services/hashtag.service';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }
}
