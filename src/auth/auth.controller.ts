import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';

import { CheckEmailDto } from './dto/check-email.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { SignUpCredentialsDto } from './dto/signup.dto';
import { DeleteUserDto } from './dto/delete-user.dot';

@ApiTags('auth')
@Controller('auth')
// @UseGuards()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @ApiForbiddenResponse({ description: 'not authorized' })
  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
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
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @GetUser() user: User,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    // console.log(user.id.toString());
    console.log(updateCredentialDto);
    return this.authService.updateUser(updateCredentialDto, user);
  }

  @Post('/deleteuser')
  @UseGuards(AuthGuard('jwt'))
  deleteAnyUser(@GetUser() user: User, @Body() deleteUserDto: DeleteUserDto) {
    return this.authService.deleteAnyUser(deleteUserDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUserById(@GetUser() user: User, @Param('id') id: string) {
    return this.authService.deleteUserById(user, id);
  }
}
