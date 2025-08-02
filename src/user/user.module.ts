import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Profile } from '../profile/profile.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UserModule {}
