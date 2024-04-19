import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Inventory)
  createInventory(
    @Args('createInventoryInput') createInventoryInput: CreateInventoryInput,
  ) {
    return this.inventoryService.create(createInventoryInput);
  }

  @Query(() => [Inventory], { name: 'inventory' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.inventoryService.findOne(id);
  }

  @Mutation(() => Inventory)
  updateInventory(
    @Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput,
  ) {
    return this.inventoryService.update(
      updateInventoryInput.id,
      updateInventoryInput,
    );
  }

  @Mutation(() => Inventory)
  removeInventory(@Args('id', { type: () => String }) id: string) {
    return this.inventoryService.remove(id);
  }
}
