import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    JwtModule.registerAsync(AuthConfig.asProvider()),
    ConfigModule.forFeature(AuthConfig),
    forwardRef(() => UserModule),
  ],
})
export class AuthModule {}
