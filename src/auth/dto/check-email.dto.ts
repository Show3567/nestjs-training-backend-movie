import { IsString } from 'class-validator';

export class CheckEmailDto {
  @IsString()
  readonly email: string;
}
