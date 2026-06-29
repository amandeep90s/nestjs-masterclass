import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from '../interfaces/google-user.interface';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting Hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createGoogleUser(googleUser: GoogleUser): Promise<User> {
    try {
      const user = this.usersRepository.create({
        ...googleUser,
        password: await this.hashingProvider.hashPassword(
          globalThis.crypto.randomUUID(),
        ),
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException('Could not create a new user', {
        cause: error as Error,
      });
    }
  }
}
