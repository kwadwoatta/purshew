import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetAccounts } from 'src/account/decorator/get-account.decorator'
import { Account } from 'src/account/models/account.model'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { AccountTypeEnum } from 'src/common'
import { User } from 'src/user/models/user.model'
import { AddToInventoryInput } from './dto/add-to-inventory.input'
import { UpdateInventoryInput } from './dto/update-inventory.input'
import { InventoryService } from './inventory.service'
import { Inventory } from './models/inventory.model'

@UseGuards(JwtGuard)
@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Inventory)
  addToInventory(
    @Args('addToInventoryInput')
    addToInventoryInput: AddToInventoryInput,
    @GetUser() user: User,
    @GetAccounts() accounts: Account[],
  ) {
    const { amount, itemDescription } = addToInventoryInput
    return this.inventoryService.create(
      amount,
      user.id,
      accounts,
      itemDescription,
    )
  }

  @Query(() => [Inventory], { name: 'inventoryItems' })
  findAll(@GetUser() user: User) {
    return this.inventoryService.findAll(user.id)
  }

  @Query(() => Inventory, { name: 'inventoryItem' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
    @GetAccounts(AccountTypeEnum.asset) account: Account,
  ) {
    console.log({ account })
    return this.inventoryService.findOne(user.id, id)
  }

  @Mutation(() => Inventory)
  updateInventory(
    @Args('updateInventoryInput')
    updateInventoryInput: UpdateInventoryInput,
    @GetUser() user: User,
  ) {
    return this.inventoryService.update(user.id, updateInventoryInput)
  }

  @Mutation(() => Inventory)
  removeInventory(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
  ) {
    return this.inventoryService.remove(user.id, id)
  }
}
