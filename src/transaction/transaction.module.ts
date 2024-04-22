import { Global, Module } from '@nestjs/common'
import { TransactionResolver } from './transaction.resolver'
import { TransactionService } from './transaction.service'

@Global()
@Module({
  providers: [TransactionResolver, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
