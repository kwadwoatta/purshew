import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';

@Module({
  providers: [InventoryResolver, InventoryService],
})
export class InventoryModule {}
