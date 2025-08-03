import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthConfig } from './config/auth.config';
import { AuthController } from './controller/auth.controller';
import { BcryptProvider } from './providers/bcrypt-provider/bcrypt-provider';
import { HashingProvider } from './providers/hashing-provider/hashing-provider';
import { AuthService } from './services/auth.service';

@Module({
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.secret'),
        signOptions: {
          expiresIn: configService.get<string>('auth.expiresIn'),
          audience: configService.get<string>('auth.audience'),
          issuer: configService.get<string>('auth.issuer'),
        },
      }),
    }),
    ConfigModule.forFeature(AuthConfig),
    forwardRef(() => UserModule),
  ],
})
export class AuthModule {}
