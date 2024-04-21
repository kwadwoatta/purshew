import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { accounts } from 'src/drizzle/schemas'
import { User } from 'src/user/models/user.model'
import { DrizzleService } from '../../drizzle/drizzle.service'

@Injectable()
export class GetAccountPipe implements PipeTransform {
  constructor(readonly drizzle: DrizzleService) {}

  async transform({
    user,
    accountType,
  }: {
    user: User
    accountType?: AccountTypeEnum
  }) {
    const userAccounts = await this.drizzle.db
      .select()
      .from(accounts)
      .where(and(eq(accounts.ownerId, user.id)))

    if (!userAccounts || userAccounts.length === 0) {
      throw new NotFoundException('no accounts found')
    }

    if (accountType) {
      return userAccounts.find((a) => a.type === accountType)
    }

    return userAccounts
  }
}
