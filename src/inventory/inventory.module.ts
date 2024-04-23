import { Module } from '@nestjs/common'
import { TransactionModule } from 'src/transaction/transaction.module'
import { InventoryResolver } from './inventory.resolver'
import { InventoryService } from './inventory.service'

@Module({
  imports: [TransactionModule],
  providers: [InventoryResolver, InventoryService],
})
export class InventoryModule {}
