import { Module } from '@nestjs/common'
import { TransactionCreatedListener } from 'src/transaction/listeners/transaction-created.listener'
import { TransactionTemplateResolver } from './transaction-template.resolver'
import { TransactionTemplateService } from './transaction-template.service'

@Module({
  providers: [
    TransactionTemplateResolver,
    TransactionTemplateService,
    TransactionCreatedListener,
  ],
})
export class TransactionTemplateModule {}
