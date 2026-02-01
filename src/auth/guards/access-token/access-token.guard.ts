import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';

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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extract the request object from the execution context
    const request: Request = context.switchToHttp().getRequest();

    // Extract the authorization header from the request
    const token = this.extractTokenFromHeader(request);

    // Validate the presence and format of the authorization header
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
