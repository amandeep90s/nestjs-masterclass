import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos';
import { User } from '../user.entity';

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

    this.authService.isAuthenticated('123');

    const environment = this.configService.get<string>('NODE_ENV');
    console.log({ environment }, this.profileConfiguration);

    return [
      {
        firstName: 'John',
        email: 'john@example.com',
      },
      {
        firstName: 'Jane',
        email: 'jane@example.com',
      },
    ];
  }

  /**
   * Fetch a user by ID
   * @param getUserParamDto
   * @returns
   */
  public async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    // Check is email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Create new user
    const newUserObj = this.usersRepository.create(createUserDto);

    const newUser = await this.usersRepository.save(newUserObj);

    return newUser;
  }
}
