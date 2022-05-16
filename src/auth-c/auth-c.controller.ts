import { Body, Controller, Post } from '@nestjs/common';
import { SignUpCredentialsDto } from 'src/auth/dto/signup.dto';
import { AuthCService } from './auth-c.service';

@Controller('auth-c')
export class AuthCController {
  constructor(private authService: AuthCService) {}

  @Post('/signup')
  signUp(
    @Body() signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(signupCredentialsDto);
  }

  // @ApiForbiddenResponse({ description: 'not authorized' })
  // @Post('/signin')
  // signIn(
  //   @Body() signinCredentialsDto: SignInCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(signinCredentialsDto);
  // }

  // @Post('/refresh-token')
  // // token in header ---> { "Authorization": `Bearer ${token}` }
  // refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto);
  // }

  // @Post('/check-email')
  // checkEmail(@Body() checkEmailDto: CheckEmailDto) {
  //   return this.authService.checkEmail(checkEmailDto);
  // }

  // @Patch('/userupdate')
  // @UseGuards(AuthGuard('token'))
  // updateUser(
  //   @GetUser() user: User,
  //   @Body() updateCredentialDto: UpdateCredentialDto,
  // ) {
  //   return this.authService.updateUser(updateCredentialDto, user);
  // }
}
