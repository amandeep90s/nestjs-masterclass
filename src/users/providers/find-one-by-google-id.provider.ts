import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their Google ID
   * @param googleId
   * @returns The user if found, otherwise undefined
   */
  /**
   * Finds a user by their Google ID
   * @param googleId
   * @returns The user if found, otherwise null
   */
  public async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ googleId });
  }
}
