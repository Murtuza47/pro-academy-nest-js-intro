import { Module } from '@nestjs/common';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { HashProvider } from './providers/hashing-provider';

@Module({
  providers: [AuthService, HashProvider],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
