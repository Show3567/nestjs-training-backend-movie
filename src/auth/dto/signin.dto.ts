import { IsEmail, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
