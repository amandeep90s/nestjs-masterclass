import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // Hashing provider using bcrypt
    {
      provide: HashingProvider, // Abstract class
      useClass: BcryptProvider, // Concrete implementation
    },
    SignInProvider,
  ],
  exports: [AuthService, HashingProvider],
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
