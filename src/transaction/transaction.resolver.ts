import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetAccounts } from 'src/account/decorator/get-account.decorator'
import { Account } from 'src/account/models/account.model'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { AccountTypeEnum } from 'src/common'
import { User } from 'src/user/models/user.model'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { Transaction } from './models/transaction.model'
import { TransactionService } from './transaction.service'

@UseGuards(JwtGuard)
@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
    @GetUser() user: User,
    @GetAccounts() accounts: Account[],
  ) {
    const { amount, creditAccountName, debitAccountName, description } =
      createTransactionInput
    return this.transactionService.create(
      amount,
      creditAccountName as any,
      debitAccountName as any,
      user.id,
      accounts,
      description,
    )
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll(@GetUser() user: User) {
    return this.transactionService.findAll(user.id)
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
    @GetAccounts(AccountTypeEnum.asset) account: Account,
  ) {
    console.log({ account })
    return this.transactionService.findOne(user.id, id)
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
    @GetUser() user: User,
  ) {
    return this.transactionService.update(user.id, updateTransactionInput)
  }

  @Mutation(() => Transaction)
  removeTransaction(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
  ) {
    return this.transactionService.remove(user.id, id)
  }
}
