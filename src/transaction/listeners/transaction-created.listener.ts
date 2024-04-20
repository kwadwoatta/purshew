import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import {
  TransactionCreatedEvent,
  TransactionCreatedEventType,
} from '../events/transaction-created.event'

@Injectable()
export class TransactionCreatedListener {
  constructor(private readonly drizzle: DrizzleService) {}

  @OnEvent(TransactionCreatedEventType.created)
  async handleTransactionCreatedEvent(event: TransactionCreatedEvent) {
    const {} = event
    await this.drizzle.db.transaction(async (tx) => {
      tx.insert
    })
  }
}
