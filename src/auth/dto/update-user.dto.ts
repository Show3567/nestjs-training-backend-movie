// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { SignUpCredentialsDto } from './signup.dto';

export class UpdateCredentialDto extends PartialType(SignUpCredentialsDto) {}
