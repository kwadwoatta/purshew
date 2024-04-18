import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/drizzle/schemas';
import { AuthInput } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private drizzle: DrizzleService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup({ email, password }: AuthInput) {
    const hash = await argon.hash(password);

    const user = await this.drizzle.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (user) throw new ConflictException('credentials taken');

    const newUsers = await this.drizzle.db
      .insert(users)
      .values({ email, hash })
      .returning();

    return this.signToken(newUsers[0].id, newUsers[0].email);
  }

  async login({ email, password }: AuthInput) {
    const user = await this.drizzle.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const pwMatches = await argon.verify(user.hash, password);
    if (!pwMatches) {
      throw new ForbiddenException('credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token };
  }
}
