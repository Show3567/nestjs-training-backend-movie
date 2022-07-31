import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UserRole } from 'src/auth/enums/user-role.enum';
import { User } from 'src/auth/entities/user.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { SignUpCredentialsDto } from 'src/auth/dto/signup.dto';
import { SignInCredentialsDto } from 'src/auth/dto/signin.dto';
import { UpdateCredentialDto } from 'src/auth/dto/update-user.dto';
import { CheckEmailDto } from 'src/auth/dto/check-email.dto';

@Injectable()
export class AuthCService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /* SignUp @Post */
  async signUp(
    signupCredentialsDto: SignUpCredentialsDto,
    res: Response,
  ): Promise<User> {
    const { username, password, email, tmdb_key, role } = signupCredentialsDto;

    // hash the password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user;
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      tmdb_key,
      role: role ? UserRole[role] : UserRole.USER,
    });

    try {
      this.createToken(user, res);
      await this.userRepository.save(user); // post user to database;
      const userfromdb = await this.userRepository.findOne({
        where: { email },
      });

      return {
        id: userfromdb.id,
        username: userfromdb.username,
        email: userfromdb.email,
        tmdb_key: userfromdb.tmdb_key,
        role: userfromdb.role,
      } as User;
    } catch (error) {
      if (error.code === '11000') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /* SignIn @Post */
  async signIn(
    signinCredentialsDto: SignInCredentialsDto,
    res: Response,
  ): Promise<User> {
    const { email, password } = signinCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      this.createToken(user, res);
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        tmdb_key: user.tmdb_key,
        role: user.role,
      } as User;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  /* Refresh Token @Get */
  async refreshToken(user: User, res: Response) {
    this.createToken(user, res);
  }

  /* Check Uniq Email in DB */
  async checkEmail({ email }: CheckEmailDto): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }

  /* Update User Info @Patch */
  async updateUser(
    updateCredentialDto: UpdateCredentialDto,
    user: User,
    res: Response,
  ) {
    const { role } = updateCredentialDto;

    await this.userRepository.update(
      { email: user.email },
      {
        ...updateCredentialDto,
        role: UserRole[role],
      },
    );
    this.createToken(user, res);

    const userfromdb = await this.userRepository.findOne({
      where: { email: user.email },
    });

    return {
      id: userfromdb.id,
      username: userfromdb.username,
      email: userfromdb.email,
      tmdb_key: userfromdb.tmdb_key,
      role: userfromdb.role,
    } as User;
  }

  /* SignOut */
  async signOut(res: Response) {
    res.cookie('token', '', { expires: new Date() });
  }

  //   async getUser(user: User): Promise<User> {
  //     const existUser = await this.userRepository.findOne({
  //       where: { user },
  //     });
  //     if (!existUser)
  //       throw new NotFoundException(`User "${user.username}" not found!`);
  //     return user;
  //   }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ create JWT to cookie~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  private createToken(user: User, res: Response) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      tmdb_key: user.tmdb_key,
    };
    const secretData = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: '',
    };
    res.cookie('accessToken', secretData, {
      httpOnly: true,
      maxAge: this.configService.get('TOKEN_EXP'),
    });
  }
}
