import { Module } from '@nestjs/common'
import { TransactionCreatedListener } from 'src/transaction/listeners/transaction-created.listener'
import { TransactionModule } from 'src/transaction/transaction.module'
import { TransactionTemplateResolver } from './transaction-template.resolver'
import { TransactionTemplateService } from './transaction-template.service'

@Module({
  imports: [TransactionModule],
  providers: [
    TransactionTemplateResolver,
    TransactionTemplateService,
    TransactionCreatedListener,
  ],
})
export class TransactionTemplateModule {}
