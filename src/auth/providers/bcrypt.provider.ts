import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hash the password using bcrypt
   * @param data The password to hash
   * @returns {Promise<string>} The hashed password
   */
  async hashPassword(data: string | Buffer): Promise<string> {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
  }

  /**
   * Compare the password with the hashed password
   * @param data The password to compare
   * @param encrypted The hashed password
   * @returns {Promise<boolean>} True if the password matches, false otherwise
   */
  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
