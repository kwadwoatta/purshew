import { Module } from '@nestjs/common'
import { TransactionTemplateResolver } from './transaction-template.resolver'
import { TransactionTemplateService } from './transaction-template.service'

@Module({
  providers: [TransactionTemplateResolver, TransactionTemplateService],
})
export class TransactionTemplateModule {}
