import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/services/user.service';
import { AuthConfig } from '../config/auth.config';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { HashingProvider } from '../providers/hashing-provider/hashing-provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    return await this.userService.createUser(signUpDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    const hashedPassword = user.password;

    if (
      !(await this.hashingProvider.comparePassword(
        loginDto.password,
        hashedPassword,
      ))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.authConfig.secret,
        expiresIn: this.authConfig.expiresIn,
        audience: this.authConfig.audience,
        issuer: this.authConfig.issuer,
      },
    );

    return {
      token,
      success: true,
      message: 'User logged in successfully',
    };
  }
}
