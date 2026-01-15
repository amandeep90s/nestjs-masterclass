import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @MaxLength(100, { message: 'First name must be at most 100 characters long' })
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Last name must be at most 100 characters long' })
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Email must be at most 100 characters long' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}
