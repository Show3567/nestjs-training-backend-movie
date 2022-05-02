import { PartialType } from '@nestjs/mapped-types';
import { AuthCredentialsDto } from './create-user.dto';

export class UpdateCredentialDto extends PartialType(AuthCredentialsDto) {}
