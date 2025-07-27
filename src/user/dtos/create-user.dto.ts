import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['male', 'female'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
