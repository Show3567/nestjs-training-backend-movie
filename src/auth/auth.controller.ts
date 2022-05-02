import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { SignInCredentialsDto } from './dto/signin.dto';
import { SignUpCredentialsDto } from './dto/signup.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('auth')
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

  //   @Patch('/userupdate')
  //   updateUser(
  //     // @Param('id') id: string,
  //     @GetUser() user: User,
  //     @Body() updateCredentialDto: UpdateCredentialDto,
  //   ) {
  //     return this.authService.updateUser(updateCredentialDto, user);
  //   }
}
