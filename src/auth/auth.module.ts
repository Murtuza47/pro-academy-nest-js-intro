import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
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
  imports: [forwardRef(() => UserModule)],
})
export class AuthModule {}
