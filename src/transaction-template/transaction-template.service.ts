import { Injectable, NotFoundException } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { transactionTemplates } from 'src/drizzle/schemas'
import { ExecuteTransactionTemplateInput } from './dto/execute-transaction-template.input'

@Injectable()
export class TransactionTemplateService {
  constructor(private readonly drizzle: DrizzleService) {}

  execute(input: ExecuteTransactionTemplateInput) {
    console.log({ input })
  }

  findAll() {
    return this.drizzle.db.select().from(transactionTemplates)
  }

  async findOne(transactionTemplateId: string) {
    const accountReceivable = (
      await this.drizzle.db
        .select()
        .from(transactionTemplates)
        .where(and(eq(transactionTemplates.id, transactionTemplateId)))
    )[0]

    if (!accountReceivable) {
      throw new NotFoundException()
    }

    return accountReceivable
  }
}
