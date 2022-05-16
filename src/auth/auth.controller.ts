import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CheckEmailDto } from './dto/check-email.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { SignUpCredentialsDto } from './dto/signup.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
// @UseGuards()
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @Get()
  //   test() {
  //     console.log('hello world!');
  //   }

  @Post('/signup')
  signUp(
    @Body() signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @ApiForbiddenResponse({ description: 'not authorized' })
  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinCredentialsDto);
  }

  @Post('/refresh-token')
  // token in header ---> { "Authorization": `Bearer ${token}` }
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('/check-email')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.authService.checkEmail(checkEmailDto);
  }

  @Patch('/userupdate')
  @UseGuards(AuthGuard('token'))
  updateUser(
    @GetUser() user: User,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    return this.authService.updateUser(updateCredentialDto, user);
  }
}
