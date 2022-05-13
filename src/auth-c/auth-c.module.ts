import { Module } from '@nestjs/common';
import { AuthCController } from './auth-c.controller';
import { AuthCService } from './auth-c.service';

@Module({
  controllers: [AuthCController],
  providers: [AuthCService]
})
export class AuthCModule {}
