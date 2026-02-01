import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Injecting jwtService to validate JWT tokens
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request object from the execution context
    const request: Request = context.switchToHttp().getRequest();

    // Extract the authorization header from the request
    const token = this.extractTokenFromHeader(request);

    // Validate the presence and format of the authorization header
    if (!token) {
      throw new UnauthorizedException(
        'Authorization token is missing or malformed',
      );
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      console.log({ payload });

      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
