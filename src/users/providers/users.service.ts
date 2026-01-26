import {
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos';
import { User } from '../user.entity';
import { UsersCreateManyProvider } from './users-create-many.provider';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param authService
   */
  constructor(
    /**
     * Injecting AuthService to verify authentication
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**
     * Injecting Users repository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Injecting config service to access application variables
     */
    private readonly configService: ConfigService,

    /**
     * Injecting profile configuration
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject UsersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}
  /**
   * Fetch all users with pagination
   * @param page
   * @param limit
   * @returns
   */
  public findAll(
    page: number,
    limit: number,
  ): Array<{ firstName: string; email: string }> {
    console.log({ page, limit });

    throw new HttpException(
      {
        status: HttpStatus.NOT_IMPLEMENTED,
        error: 'The API endpoint is not implemented yet.',
        fileName: 'src/users/providers/users.service.ts',
        lineNumber: 65,
      },
      HttpStatus.NOT_IMPLEMENTED,
      {
        cause: new Error('Not Implemented'),
        description: 'This method is a placeholder and needs implementation.',
      },
    );
  }

  /**
   * Fetch a user by ID
   * @param getUserParamDto
   * @returns
   */
  public async findById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Create a new user
   * @param createUserDto
   * @returns
   */
  public async create(createUserDto: CreateUserDto) {
    // Check is email already exists
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
    const newUserObj = this.usersRepository.create(createUserDto);
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

  /**
   * Create multiple users
   * @param createUsersDto
   */
  public async createMany(createUsersDto: CreateUserDto[]) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }
}
