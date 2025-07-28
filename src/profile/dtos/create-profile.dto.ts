import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEnum(['male', 'female'])
  @IsOptional()
  gender?: 'male' | 'female' | null;

  @IsDate()
  @IsOptional()
  date_of_birth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profile_image?: string;
}
