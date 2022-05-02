import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInCredentialsDto {
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
}
