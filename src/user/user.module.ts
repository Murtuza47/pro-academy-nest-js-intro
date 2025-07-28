import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from '../profile/profile.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User, Profile])],
})
export class UserModule {}
