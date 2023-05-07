import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { SignUpCredentialsDto } from './dto/signup.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { DeleteUserDto } from './dto/delete-user.dot';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /* SignUp @Post */
  async signUp(
    signupCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ accessToken: string; role: UserRole }> {
    try {
      const { username, password, email, tmdb_key, role } =
        signupCredentialsDto;

      // hash the password;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // create user;
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        email,
        tmdb_key,
        role: UserRole[role] || UserRole.USER,
      });

      await this.userRepository.save(user); // post user to database;
      const userfromdb = await this.userRepository.findOne({
        where: { email },
      });

      const accessToken: string = this.createToken(userfromdb); // return Token;

      return { accessToken, role: user.role };
    } catch (error) {
      if (error.code === '11000') {
        // 23505 --> duplicate username // for postgresql
        // 11000 --> duplicate username // for mongodb
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /* SignIn @Post */
  async signIn(
    signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
    const { email, password } = signinCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = this.createToken(user);
      return { accessToken, role: user.role };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  /* Refresh Token @Post */
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { email } = refreshTokenDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      const accessToken: string = this.createToken(user);
      return { accessToken, role: user.role };
    } else {
      throw Error('Please complete your user info');
    }
  }

  /* Check Uniq Email in DB */
  async checkEmail({ email }: CheckEmailDto): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }

  /* Update User Info @Patch */
  async updateUser(updateCredentialDto: UpdateCredentialDto, user: User) {
    const { role } = updateCredentialDto;

    await this.userRepository.update(
      { email: user.email },
      {
        ...updateCredentialDto,
        role: UserRole[role],
      },
    );

    const updatedUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    const accessToken: string = this.createToken(updatedUser);
    return { accessToken, role: updatedUser.role };
  }

  /* Delete User @Post */
  async deleteAnyUser(deleteUserDto: DeleteUserDto, user: User) {
    if (user.role !== UserRole.ADMIN)
      new UnauthorizedException(
        `You don't have the permission to delete a user.`,
      );
    const { email } = deleteUserDto;
    const userfromdb = await this.userRepository.findOne({ where: { email } });
    if (!userfromdb) {
      throw new NotFoundException(`User "${user.username}" not found!`);
    }
    await this.userRepository.delete({ email });

    return { email };
  } /* testing */

  /* Delete User @Delete  */
  async deleteUserById(user: User, id: string) {
    const userfromdb = await this.userRepository.findOne({ where: { id } });
    if (!userfromdb) {
      throw new NotFoundException(`User which ID is "${id}" not found!`);
    }
    if (user.role !== UserRole.ADMIN)
      new UnauthorizedException(
        `You don't have the permission to delete a user.`,
      );
    await this.userRepository.delete({ id });
    return userfromdb;
  }

  async getUser(user: User): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (!existUser)
      throw new NotFoundException(`User "${user.username}" not found!`);
    return user;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ create JWT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  private createToken(user: User) {
    console.log(user);

    const payload: JwtPayload = {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      tmdb_key: user.tmdb_key,
    };

    const accessToken: string = this.jwtService.sign(payload);
    return accessToken;
  }
}

/* 
    create the jwt during signUp --> jwt hold the {email} now;
    
    when send request to server --> jwt strategy will validate the jwt, 

    the validate can get the payload in the jwt, in this case --> {email}
    base on the email, validate fn can find the user from the repository;
    then return ---> user

    the getUser decorator can get the user after it from the jwtstrategy --> req.user

    in the task request, it can get this user too!
*/
