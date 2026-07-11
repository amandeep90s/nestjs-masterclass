import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { GoogleUser } from 'src/users/interfaces/google-user.interface';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
    /**
     * Injecting usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Injecting generateTokenProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauth2Client = new OAuth2Client({
      clientId,
      clientSecret,
    });
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the google token sent by the client
      const { token } = googleTokenDto;

      const loginTicket = await this.oauth2Client.verifyIdToken({
        idToken: token,
        audience: this.jwtConfiguration.googleClientId,
      });

      // Extract the payload from the token
      const payload = loginTicket.getPayload();
      if (!payload?.sub || !payload.email || !payload.given_name) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

      // Find the user in the database by using googleId
      const user = await this.usersService.findOneByGoogleId(googleId);

      if (user) {
        return await this.generateTokensProvider.generateTokens(user);
      }

      // Create a new user if not found
      const googleUser: GoogleUser = {
        googleId,
        email,
        firstName,
        lastName,
      };
      const newUser = await this.usersService.createGoogleUser(googleUser);
      return await this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid Google token', {
        cause: error as Error,
      });
    }
  }
}
