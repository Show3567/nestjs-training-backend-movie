import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignUpCredentialsDto } from 'src/auth/dto/signup.dto';
import { AuthCService } from './auth-c.service';
import { User } from '../auth/entities/user.entity';
import { Response } from 'express';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { SignInCredentialsDto } from 'src/auth/dto/signin.dto';
@Controller('auth-c')
export class AuthCController {
  constructor(private authService: AuthCService) {}

  @Post('/signup')
  signUp(
    @Body() signupCredentialsDto: SignUpCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    return this.authService.signUp(signupCredentialsDto, res);
  }

  @ApiForbiddenResponse({ description: 'not authorized' })
  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signinCredentialsDto, res);
  }

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
