import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AccountTypeEnum } from 'src/drizzle/schemas'
import { ValidateAccountPipe } from '../pipe/validate-account.pipe'

const GetAccountId = createParamDecorator(
  (accountType: AccountTypeEnum, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (!accountType) {
      throw new NotFoundException(
        'cannot get account(s) without specifying account_type',
      )
    }

    return { user: req.user, accountType }
  },
)

export const GetAccount = (accountType: AccountTypeEnum) =>
  GetAccountId(accountType, ValidateAccountPipe)
