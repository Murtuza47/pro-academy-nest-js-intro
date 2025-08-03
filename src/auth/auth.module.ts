import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  imports: [ConfigModule.forFeature(AuthConfig), forwardRef(() => UserModule)],
})
export class AuthModule {}
