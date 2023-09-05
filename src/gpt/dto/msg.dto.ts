import { IsString } from 'class-validator';

export class GPTMessageDTO {
  @IsString()
  readonly msg: string;
}
