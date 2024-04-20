import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetAccounts } from 'src/account/decorator/get-account.decorator'
import { Account } from 'src/account/models/account.model'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { TransactionTemplateTypeEnum } from 'src/drizzle/schemas'
import { Transaction } from 'src/transaction/models/transaction.model'
import { User } from 'src/user/models/user.model'
import { GetTransactionTemplates } from './decorator/get-transaction-templates.decorator'
import { ExecuteTransactionTemplateInput } from './dto/execute-transaction-template.input'
import { TransactionTemplate } from './models/transaction-template.model'
import { TransactionTemplateService } from './transaction-template.service'

@UseGuards(JwtGuard)
@Resolver(() => TransactionTemplate)
export class TransactionTemplateResolver {
  constructor(
    private readonly transactionTemplateService: TransactionTemplateService,
  ) {}

  @Mutation(() => Transaction)
  executeTransactionTemplate(
    @Args('executeTransactionTemplateInput')
    input: ExecuteTransactionTemplateInput,
    @GetTransactionTemplates() txTemplates: TransactionTemplate[],
    @GetUser() user: User,
    @GetAccounts() accounts: Account[],
  ) {
    const txTemplate = txTemplates.find((txT) => txT.type === input.template)
    return this.transactionTemplateService.execute(
      input.amount,
      txTemplate,
      user.id,
      accounts,
    )
  }

  @Query(() => [TransactionTemplate], { name: 'transactionTemplates' })
  findAll(@GetTransactionTemplates() txTemplates: TransactionTemplate[]) {
    return txTemplates
  }

  @Query(() => TransactionTemplate, { name: 'transactionTemplate' })
  findOne(
    @Args('template', { type: () => TransactionTemplateTypeEnum })
    template: TransactionTemplateTypeEnum,
    @GetTransactionTemplates() txTemplates: TransactionTemplate[],
  ) {
    return txTemplates.find((txT) => txT.type === template)
  }
}
