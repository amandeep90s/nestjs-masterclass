import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

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

    // Send confirmation
    return { message: 'Sign-in successful', userId: user?.id };
  }
}
