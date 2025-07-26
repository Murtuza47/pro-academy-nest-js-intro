import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService],
})
export class AuthModule {}
