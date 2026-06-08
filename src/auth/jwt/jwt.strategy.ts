import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  username: string,
  sub: number,
  iat: number, // timestamp of start
  exp: number, // timestamp of expiration
}

export interface ValidationResponse {
  userId: number,
  username: string,
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET ?? 'anime',
    });
  }

  async validate(payload: JwtPayload): Promise<ValidationResponse|null> {
    const user = await this.usersService.findOne(payload.username); // TODO: payload already has a name and an ID. should we really check it?
    if (user) {
      return { userId: user.userId, username: user.username };
    }
    return null;
  }
}
