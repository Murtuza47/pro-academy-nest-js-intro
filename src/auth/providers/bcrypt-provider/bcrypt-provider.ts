import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingProvider } from '../hashing-provider/hashing-provider';

@Injectable()
export class BcryptProvider extends HashingProvider {
  async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string | Buffer,
    hash: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash.toString());
  }
}
