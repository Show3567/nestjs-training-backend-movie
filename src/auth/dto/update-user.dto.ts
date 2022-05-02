import { PartialType } from '@nestjs/mapped-types';
import { SignUpCredentialsDto } from './signup.dto';

export class UpdateCredentialDto extends PartialType(SignUpCredentialsDto) {}
