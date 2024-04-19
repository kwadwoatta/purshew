import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { accounts, users } from 'src/drizzle/schemas';
import { User } from 'src/user/models/user.model';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: CreateAccountInput, user: User) {
    return this.drizzle.db
      .insert(accounts)
      .values({
        ownerId: user.id,
        ...input,
      })
      .returning();
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(users)
      .where(and(eq(accounts.ownerId, userId)));
  }

  findOne(accountId: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(users)
      .where(and(eq(accounts.ownerId, userId), eq(accounts.id, accountId)));
  }

  update(userId: string, input: UpdateAccountInput) {
    return this.drizzle.db
      .update(users)
      .set({
        ...input,
      })
      .where(and(eq(accounts.ownerId, userId), eq(accounts.id, input.id)));
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(users)
      .where(and(eq(accounts.ownerId, userId), eq(accounts.id, id)));
  }
}
