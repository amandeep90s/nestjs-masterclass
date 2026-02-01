import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Injecting Users repository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch user at this time',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User with the given email not found');
    }

    return user;
  }
}
