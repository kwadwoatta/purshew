import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtGuard } from 'src/auth/guard'
import { TransactionTemplateTypeEnum } from 'src/drizzle/schemas'
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

  @Mutation(() => TransactionTemplate)
  executeTransactionTemplate(
    @Args('executeTransactionTemplateInput')
    executeTransactionTemplateInput: ExecuteTransactionTemplateInput,
  ) {
    return this.transactionTemplateService.execute(
      executeTransactionTemplateInput,
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
