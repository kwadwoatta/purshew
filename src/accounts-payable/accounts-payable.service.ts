import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { accountsPayable } from 'src/drizzle/schemas';

import { DrizzleService } from 'src/drizzle/drizzle.service';
import { UpdateAccountsPayableInput } from './dto/update-accounts-payable.input';

@Injectable()
export class AccountsPayableService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: any, userId: string) {
    return this.drizzle.db
      .insert(accountsPayable)
      .values({
        userId: userId,
        ...input,
      })
      .returning();
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(accountsPayable)
      .where(and(eq(accountsPayable.ownerId, userId)));
  }

  findOne(userId: string, accountPayableId: string) {
    return this.drizzle.db
      .select()
      .from(accountsPayable)
      .where(
        and(
          eq(accountsPayable.ownerId, userId),
          eq(accountsPayable.id, accountPayableId),
        ),
      );
  }

  update(userId: string, input: UpdateAccountsPayableInput) {
    return this.drizzle.db
      .update(accountsPayable)
      .set({
        ...input,
      })
      .where(
        and(
          eq(accountsPayable.ownerId, userId),
          eq(accountsPayable.id, input.id),
        ),
      );
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(accountsPayable)
      .where(
        and(eq(accountsPayable.ownerId, userId), eq(accountsPayable.id, id)),
      );
  }
}
