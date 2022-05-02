import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin.dto';
import { SignUpCredentialsDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
