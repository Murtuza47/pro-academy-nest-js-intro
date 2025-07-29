import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsInt()
  user_id: number;

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  hashtag_ids?: number[];
}
