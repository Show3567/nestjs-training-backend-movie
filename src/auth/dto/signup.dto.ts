import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class SignUpCredentialsDto {
  @ApiProperty({
    description: 'show username in the header or nav after user signin',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  readonly username: string;

  @ApiProperty()
  @IsString()
  // @MinLength(4)
  // @MaxLength(10)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too week!',
  // })
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  readonly role: string;

  @ApiProperty()
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
