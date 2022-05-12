import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { SignUpCredentialsDto } from './dto/signup.dto';

@Controller('auth')
@UseGuards()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinCredentialsDto);
  }

  @Post('/refresh-token')
  // @UseGuards(AuthGuard('refreshToken'))
  // token in header ---> { "Authorization": `Bearer ${token}` }
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  //   @Patch('/userupdate')
  //   updateUser(
  //     // @Param('id') id: string,
  //     @GetUser() user: User,
  //     @Body() updateCredentialDto: UpdateCredentialDto,
  //   ) {
  //     return this.authService.updateUser(updateCredentialDto, user);
  //   }
}
