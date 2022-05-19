import { IsString } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  readonly email: string;
}
