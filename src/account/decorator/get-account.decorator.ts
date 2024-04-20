import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AccountTypeEnum } from 'src/drizzle/schemas'
import { GetAccountPipe } from '../pipe/get-account.pipe'

const GetAccountId = createParamDecorator(
  (accountType: AccountTypeEnum, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    return { user: req.user, accountType }
  },
)

export const GetAccounts = (accountType?: AccountTypeEnum) =>
  GetAccountId(accountType, GetAccountPipe)
