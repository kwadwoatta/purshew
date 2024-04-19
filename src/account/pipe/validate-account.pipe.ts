import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { accounts } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';
import { User } from 'src/user/models/user.model';
import { DrizzleService } from '../../drizzle/drizzle.service';

@Injectable()
export class ValidateAccountPipe implements PipeTransform {
  constructor(readonly drizzle: DrizzleService) {}

  async transform({
    user,
    accountType,
  }: {
    user: User;
    accountType: AccountTypeEnum;
  }) {
    const acc = (
      await this.drizzle.db
        .select()
        .from(accounts)
        .where(
          and(eq(accounts.type, accountType), eq(accounts.ownerId, user.id)),
        )
    )[0];

    if (!acc) {
      throw new NotFoundException('no account for given account_id');
    }

    return acc;
  }
}
