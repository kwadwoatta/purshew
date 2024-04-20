import { Module } from '@nestjs/common';
import { TransactionTemplateService } from './transaction_template.service';
import { TransactionTemplateResolver } from './transaction_template.resolver';

@Module({
  providers: [TransactionTemplateResolver, TransactionTemplateService],
})
export class TransactionTemplateModule {}
