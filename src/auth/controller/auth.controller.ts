import { Body, Controller, Post } from '@nestjs/common';

import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
