import { Injectable, NotFoundException } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { transactions } from 'src/drizzle/schema'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'

@Injectable()
export class TransactionService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: CreateTransactionInput, userId: string) {
    const {
      amount,
      creditAccountId,
      debitAccountId,
      description,
      creditAccountAccountId,
      debitAccountAccountId,
      debitAccountName,
      creditAccountName,
      debitAmount,
      creditAmount,
    } = input
    return this.drizzle.db
      .insert(transactions)
      .values({
        ownerId: userId,
        amount,
        updatedAt: new Date(),
        description,
        creditAccountId,
        debitAccountId,
        creditAccountAccountId,
        debitAccountAccountId,
        debitAccountName,
        creditAccountName,
        debitAmount,
        creditAmount,
      })
      .returning()
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(transactions)
      .where(and(eq(transactions.ownerId, userId)))
  }

  async findOne(userId: string, accountPayableId: string) {
    const tx = (
      await this.drizzle.db
        .select()
        .from(transactions)
        .where(
          and(
            eq(transactions.ownerId, userId),
            eq(transactions.id, accountPayableId),
          ),
        )
    )[0]

    if (!tx) {
      throw new NotFoundException()
    }

    return tx
  }

  update(userId: string, input: UpdateTransactionInput) {
    return this.drizzle.db
      .update(transactions)
      .set({
        ...input,
      })
      .where(
        and(eq(transactions.ownerId, userId), eq(transactions.id, input.id)),
      )
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(transactions)
      .where(and(eq(transactions.ownerId, userId), eq(transactions.id, id)))
  }
}
