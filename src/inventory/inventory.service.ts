import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq } from 'drizzle-orm'
import { Account } from 'src/account/models/account.model'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { inventory } from 'src/drizzle/schema'
import * as accountsSchema from 'src/drizzle/schema/accounts/account-types'
import { TransactionService } from 'src/transaction/transaction.service'
import { UpdateInventoryInput } from './dto/update-inventory.input'
import { Inventory } from './models/inventory.model'

@Injectable()
export class InventoryService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly txService: TransactionService,
  ) {}

  async create(
    amount: number,
    userId: string,
    userAccounts: Account[],
    description: string,
  ): Promise<Inventory> {
    type AccountTypeAccountKey = keyof ExtractTablesWithRelations<
      typeof accountsSchema
    >

    const creditAccountName: AccountTypeAccountKey = 'cash'
    const debitAccountName: AccountTypeAccountKey = 'inventory'

    const json = await this.txService.create(
      amount,
      creditAccountName,
      debitAccountName,
      userId,
      userAccounts,
      description,
    )

    const jsonInventory = json[0]['inventory']
    const inventory: Inventory = {
      ...jsonInventory,
      createdAt: new Date(jsonInventory['createdAt']),
      updatedAt: new Date(jsonInventory['updatedAt']),
    }

    return inventory
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(inventory)
      .where(and(eq(inventory.ownerId, userId)))
  }

  async findOne(userId: string, accountPayableId: string) {
    const inv = (
      await this.drizzle.db
        .select()
        .from(inventory)
        .where(
          and(
            eq(inventory.ownerId, userId),
            eq(inventory.id, accountPayableId),
          ),
        )
    )[0]

    if (!inv) {
      throw new NotFoundException()
    }

    return inv
  }

  update(userId: string, input: UpdateInventoryInput) {
    return this.drizzle.db
      .update(inventory)
      .set({
        ...input,
        amount: String(input.amount),
      })
      .where(and(eq(inventory.ownerId, userId), eq(inventory.id, input.id)))
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(inventory)
      .where(and(eq(inventory.ownerId, userId), eq(inventory.id, id)))
  }
}
