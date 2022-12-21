import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt-c') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtCookieStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  private static extractJWT(req: Request): string | null {
    console.log(req.cookies);
    if (req.cookies && req.cookies['auth-cookie']) {
      return req.cookies['auth-cookie'].accessToken;
    }
    return null;
  }
}
