import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { IActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
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

    /**
     * Inject userService to fetch user data from the database
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async refreshTokens(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify the refresh token using jwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, this.jwtConfiguration);

      // Fetch the user associated with the refresh token from the database
      const user = await this.usersService.findById(sub);

      // Generate a new access token and refresh token for the user
      const tokens = await this.generateTokensProvider.generateTokens(user);

      return tokens;
    } catch (error) {
      // Handle error (e.g., invalid refresh token, user not found)
      throw new UnauthorizedException(error);
    }
  }
}
