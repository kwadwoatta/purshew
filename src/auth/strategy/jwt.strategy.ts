import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { eq } from 'drizzle-orm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { users } from 'src/drizzle/schema'
import { User } from 'src/user/models/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private drizzle: DrizzleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = (
      await this.drizzle.db
        .select()
        .from(users)
        .where(eq(users.id, payload.sub))
    )[0]

    if (!user) {
      throw new UnauthorizedException()
    }

    delete user.hash

    return { ...user }
  }
}
// async validate(payload: { sub: string; email: string }): Promise<User> {
//   const join = await this.drizzle.db
//     .select()
//     .from(users)
//     .where(eq(users.id, payload.sub))
//     .fullJoin(accounts, and(eq(accounts.ownerId, payload.sub)))
//     .fullJoin(transactions, and(eq(transactions.ownerId, payload.sub)));

//   const user = join[0].users;
//   const txs = join.map((j) => j.transactions);
//   const userAccounts = join
//     .map((j) => j.accounts)
//     .map<Account>((acc) => ({
//       ...acc,
//       transactions: txs
//         .filter((tx) => tx.fromAccountId === acc.id)
//         .map((tx) => ({
//           ...tx,
//           fromAccount: acc,
//           owner: user,
//         })),
//     }));

//   if (!user) {
//     throw new UnauthorizedException();
//   }

//   delete user.hash;
//   return { ...user, accounts: userAccounts };
// }
