import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(password: string | Buffer): Promise<string>;
  abstract comparePassword(
    password: string | Buffer,
    hash: string | Buffer,
  ): Promise<boolean>;
}
