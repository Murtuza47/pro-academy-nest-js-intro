import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string

  @IsString()
  gender: string

  @IsBoolean()
  isMarried: boolean;
}