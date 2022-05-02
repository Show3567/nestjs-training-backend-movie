import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class SignUpCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  readonly username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too week!',
  })
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsEnum(UserRole)
  readonly role: string;

  @IsString()
  @MinLength(15)
  tmdb_key: string;
}

/**
    Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character
    There is no length validation (min, max) in this regex!

    Regular expression for JavaScript:
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
 */
