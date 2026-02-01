import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user by email
    // Throw error if user not found
    // Validate password
    // Send confirmation
  }

  public isAuthenticated(token: string): boolean {
    return token === '123';
  }
}
