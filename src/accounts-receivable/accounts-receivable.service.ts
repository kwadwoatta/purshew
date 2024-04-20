import { Injectable, NotFoundException } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { accountsReceivable } from 'src/drizzle/schemas'

import { DrizzleService } from 'src/drizzle/drizzle.service'

import { CreateAccountsReceivableInput } from './dto/create-accounts-receivable.input'
import { UpdateAccountsReceivableInput } from './dto/update-accounts-receivable.input'

@Injectable()
export class AccountsReceivableService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: CreateAccountsReceivableInput, userId: string) {
    return this.drizzle.db
      .insert(accountsReceivable)
      .values({
        ...input,
        ownerId: userId,
        customerId: '',
        amount: '',
        accountId: '',
      })
      .returning()
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(accountsReceivable)
      .where(and(eq(accountsReceivable.ownerId, userId)))
  }

  async findOne(userId: string, accountReceivableId: string) {
    const accountReceivable = (
      await this.drizzle.db
        .select()
        .from(accountsReceivable)
        .where(
          and(
            eq(accountsReceivable.ownerId, userId),
            eq(accountsReceivable.id, accountReceivableId),
          ),
        )
    )[0]

    if (!accountReceivable) {
      throw new NotFoundException()
    }

    return accountReceivable
  }

  update(userId: string, input: UpdateAccountsReceivableInput) {
    return this.drizzle.db
      .update(accountsReceivable)
      .set({
        ...input,
        ownerId: userId,
      })
      .where(
        and(
          eq(accountsReceivable.ownerId, userId),
          eq(accountsReceivable.id, input.id),
        ),
      )
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(accountsReceivable)
      .where(
        and(
          eq(accountsReceivable.ownerId, userId),
          eq(accountsReceivable.id, id),
        ),
      )
  }
}
