import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { InferSelectModel, eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/drizzle/schemas';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private drizzle: DrizzleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<InferSelectModel<typeof users>> {
    const user = await this.drizzle.db.query.users.findFirst({
      where: eq(users.id, payload.sub),
    });

    delete user.hash;
    return user;
  }
}
