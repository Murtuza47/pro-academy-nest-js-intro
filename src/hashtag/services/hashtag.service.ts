import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHashtagDto } from '../dtos/create-hashtag.dto';
import { Hashtag } from '../hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async createHashtag(createHashtagDto: CreateHashtagDto): Promise<Hashtag> {
    const hashtag = this.hashtagRepository.create(createHashtagDto);

    return await this.hashtagRepository.save(hashtag);
  }

  async deleteHashtag(id: number): Promise<string> {
    await this.hashtagRepository.delete(id);

    return 'Hashtag deleted successfully';
  }

  async softDeleteHashtag(id: number): Promise<string> {
    await this.hashtagRepository.softDelete(id);

    return 'Hashtag soft deleted successfully';
  }
}
