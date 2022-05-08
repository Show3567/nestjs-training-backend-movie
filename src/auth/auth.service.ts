import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/signup.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password, email, tmdb_key } = signupCredentialsDto;

    const salt = await bcrypt.genSalt(); // hash the password;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      tmdb_key,
      role: UserRole.USER,
    }); // create user;
    try {
      const thisuser = await this.userRepository.save(user); // post user to database;
      const accessToken: string = await this.createToken(user); // return Token;

      return { accessToken };
    } catch (error) {
      if (error.code === '23505') {
        // 23505 --> duplicate username

        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signinCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = await this.createToken(user);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const accessToken: string = await this.createToken(refreshTokenDto as User);
    return { accessToken };
  }

  async updateUser(updateCredentialDto: UpdateCredentialDto, user: User) {
    // await this.getUser(user);

    const { role } = updateCredentialDto;
    const updatedUser = await this.userRepository.update(user.id, {
      ...updateCredentialDto,
      role: UserRole[role],
    });

    return updatedUser;
  }

  async getUser(user: User): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { user },
    });
    if (!existUser)
      throw new NotFoundException(`User "${user.username}" not found!`);
    return user;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ create JWT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  private async createToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      tmdb_key: user.tmdb_key,
    };
    /* 
        create the jwt during signUp --> jwt hold the {username} now;
        
        when send request to server --> jwt strategy will validate the jwt, 

        the validate can get the payload in the jwt, in this case --> {username}
        base on the username, validate fn can find the user from the repository;
        then return ---> user

        the getUser decorator can get the user after it from the jwtstrategy --> req.user

        in the task request, it can get this user too!
    */
    const accessToken: string = await this.jwtService.sign(payload);
    return accessToken;
  }
}
