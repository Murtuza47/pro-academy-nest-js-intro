import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { appconfig } from './configs/app.config';
import { databaseConfig } from './configs/database.config';
import { envValidationSchema } from './configs/validations/env.validation';
import { HashtagModule } from './hashtag/hashtag.module';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UserModule,
    TweetModule,
    AuthModule,
    ProfileModule,
    HashtagModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}.local`,
      load: [appconfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get<string>('database.host'),
        port: Number(configService.get<number>('database.port')),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
      }),
    }),
    PaginationModule,
  ],
})
export class AppModule {}
