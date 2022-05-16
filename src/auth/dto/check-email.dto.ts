import { IsEmail, IsString } from 'class-validator';

export class CheckEmailDto {
  @IsString()
  @IsEmail()
  readonly email: string;
}
