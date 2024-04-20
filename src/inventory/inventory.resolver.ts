import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetAccount } from 'src/account/decorator/get-account.decorator'
import { Account } from 'src/account/models/account.model'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum'
import { User } from 'src/user/models/user.model'
import { CreateInventoryInput } from './dto/create-inventory.input'
import { UpdateInventoryInput } from './dto/update-inventory.input'
import { InventoryService } from './inventory.service'
import { Inventory } from './models/inventory.model'

@UseGuards(JwtGuard)
@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Inventory)
  createInventory(
    @Args('createInventoryInput')
    createInventoryInput: CreateInventoryInput,
    @GetUser() user: User,
  ) {
    return this.inventoryService.create(createInventoryInput, user.id)
  }

  @Query(() => [Inventory], { name: 'inventoryAll' })
  findAll(@GetUser() user: User) {
    return this.inventoryService.findAll(user.id)
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
    @GetAccount(AccountTypeEnum.asset) account: Account,
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
