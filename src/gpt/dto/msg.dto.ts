import { IsOptional, IsString } from 'class-validator';

export class GPTMessageDTO {
  @IsString()
  readonly msg: string;

  @IsString()
  @IsOptional()
  readonly sys: string;
}
