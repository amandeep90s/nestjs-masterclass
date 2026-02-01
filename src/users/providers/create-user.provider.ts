import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../user.entity';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting Users repository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Injecting Hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  /**
   * Create a new user
   * @param createUserDto
   * @returns
   */
  public async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    let existingUser: User | null = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch {
      // Might save the details of the exception
      // Information which is sensitive should not be logged
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Create new user
    const newUserObj = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    try {
      return await this.usersRepository.save(newUserObj);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }
}
