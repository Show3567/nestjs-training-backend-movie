import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { AuthCookieService } from './auth-c.service';
import { User } from '../auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { SignInCredentialsDto } from 'src/auth/dto/signin.dto';
import { SignUpCredentialsDto } from 'src/auth/dto/signup.dto';
import { UpdateCredentialDto } from 'src/auth/dto/update-user.dto';
import { CheckEmailDto } from 'src/auth/dto/check-email.dto';

@ApiTags('auth-c')
@Controller('auth-c')
export class AuthCookieController {
  constructor(private authService: AuthCookieService) {}

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

  @Get('/initapp')
  @UseGuards(AuthGuard('jwt-c'))
  initapp(@GetUser() user: User) {
    return this.authService.initapp(user);
  }

  @Get('/signout')
  signOut(@Res({ passthrough: true }) res: Response) {
    this.authService.signOut(res);
  }

  @Post('/check-email')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.authService.checkEmail(checkEmailDto);
  }

  @Patch('/userupdate')
  @UseGuards(AuthGuard('jwt-c'))
  updateUser(
    @GetUser() user: User,
    @Body() updateCredentialDto: UpdateCredentialDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(user);
    return this.authService.updateUser(updateCredentialDto, user, res);
  }

  /* testing */
  @Get()
  findAll(@Req() request: Request) {
    console.log(request.cookies); // or "request.cookies['cookieKey']"
    // or console.log(request.signedCookies);
  }

  @Get('/refresh-token')
  @UseGuards(AuthGuard('jwt-c'))
  refreshToken(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('in controler: ', user);
    this.authService.refreshToken(user, res);
  }
}
