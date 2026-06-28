import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { SignInDto } from '../dtos/signin.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting UsersService to access user data
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting hashingProvider to validate password
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * Injecting jwtService to generate JWT tokens
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting generateTokensProvider to generate access and refresh tokens
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user by email
    // Throw error if user not found
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials provided');
    }

    // Validate password
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not validate password at this time',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials provided');
    }

    return await this.generateTokensProvider.generateTokens(user);
  }
}
