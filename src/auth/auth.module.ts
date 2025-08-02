import { Module } from '@nestjs/common';

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
  exports: [AuthService],
})
export class AuthModule {}
