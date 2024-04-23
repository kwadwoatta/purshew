import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq, sum } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { accounts } from 'src/drizzle/schema'
import * as accountsSchema from 'src/drizzle/schema/accounts/account-types'
import { User } from 'src/user/models/user.model'
import { CreateAccountInput } from './dto/create-account.input'
import { UpdateAccountInput } from './dto/update-account.input'

@Injectable()
export class AccountService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: CreateAccountInput, user: User) {
    return this.drizzle.db
      .insert(accounts)
      .values({
        ownerId: user.id,
        ...input,
      })
      .returning()
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(accounts)
      .where(and(eq(accounts.ownerId, userId)))
  }

  async findAllAccountsForAccountTypes(userId: string): Promise<JSON> {
    return this.drizzle.db.transaction(async (tx) => {
      const userAccounts = await tx
        .select()
        .from(accounts)
        .where(and(eq(accounts.ownerId, userId)))

      type UnionType = keyof ExtractTablesWithRelations<typeof accountsSchema>

      function isKeyOfUnionType(key: string): key is UnionType {
        return key in accountsSchema
      }

      const userAccountsWithSubAccounts: Record<string, any> = {}

      for (const userAccount of userAccounts) {
        userAccountsWithSubAccounts[userAccount.name] = {
          ...userAccount,
          accounts: [],
        }

        for (const key in accountsSchema) {
          if (isKeyOfUnionType(key)) {
            const table = accountsSchema[key]

            const subAccounts = await tx
              .select()
              .from(table)
              .where(
                and(
                  eq(table.accountId, userAccount.id),
                  eq(table.ownerId, userId),
                ),
              )

            ;(
              userAccountsWithSubAccounts[userAccount.name]['accounts'] as any[]
            ).push(...subAccounts)
          }
        }
      }

      return JSON.parse(JSON.stringify(userAccountsWithSubAccounts))
    })
  }

  async financialStatement(userId: string): Promise<JSON> {
    return this.drizzle.db.transaction(async (tx) => {
      const userAccounts = await tx
        .select({
          name: accounts.name,
          balance: accounts.balance,
          id: accounts.id,
        })
        .from(accounts)
        .where(and(eq(accounts.ownerId, userId)))

      type UnionType = keyof ExtractTablesWithRelations<typeof accountsSchema>

      function isKeyOfUnionType(key: string): key is UnionType {
        return key in accountsSchema
      }

      const userAccountsWithSubAccounts: Record<string, any> = {}

      for (const userAccount of userAccounts) {
        userAccountsWithSubAccounts[userAccount.name] = {
          ...userAccount,
          accounts: {},
        }

        for (const key in accountsSchema) {
          if (isKeyOfUnionType(key)) {
            const table = accountsSchema[key]

            const subAccountsTotal = await tx
              .select({ total: sum(table.amount) })
              .from(table)
              .where(
                and(
                  eq(table.accountId, userAccount.id),
                  eq(table.ownerId, userId),
                ),
              )

            if (table.accountType.default === userAccount.name) {
              userAccountsWithSubAccounts[userAccount.name]['accounts'][key] =
                subAccountsTotal[0].total ?? '0.0'
            }
          }
        }
      }

      return JSON.parse(JSON.stringify(userAccountsWithSubAccounts))
    })
  }

  findAccountTypes(): AccountTypeEnum[] {
    return Object.keys(AccountTypeEnum).map<AccountTypeEnum>(
      (ace) => AccountTypeEnum[ace],
    )
  }

  async findOne(accountId: string, userId: string) {
    const account = (
      await this.drizzle.db
        .select()
        .from(accounts)
        .where(and(eq(accounts.ownerId, userId), eq(accounts.id, accountId)))
    )[0]

    if (!account) {
      throw new NotFoundException()
    }

    return account
  }

  update(userId: string, input: UpdateAccountInput) {
    return this.drizzle.db
      .update(accounts)
      .set({
        ...input,
      })
      .where(and(eq(accounts.ownerId, userId), eq(accounts.id, input.id)))
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(accounts)
      .where(and(eq(accounts.ownerId, userId), eq(accounts.id, id)))
  }
}
