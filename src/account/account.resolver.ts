import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { AccountTypeEnum } from 'src/common'
import { User } from 'src/user/models/user.model'
import { AccountService } from './account.service'
import { CreateAccountInput } from './dto/create-account.input'
import { Account } from './models/account.model'

@UseGuards(JwtGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  createAccount(
    @GetUser() user: User,
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountService.create(createAccountInput, user)
  }

  @Query(() => [Account], { name: 'accounts' })
  findAll(@GetUser() user: User) {
    return this.accountService.findAll(user.id)
  }

  @Query(() => GraphQLJSON, { name: 'generalLedgerAccounts' })
  generalLedgerAccounts(@GetUser() user: User) {
    return this.accountService.findAllAccountsForAccountTypes(user.id)
  }

  @Query(() => GraphQLJSON, { name: 'financialStatement' })
  financialStatement(@GetUser() user: User) {
    return this.accountService.financialStatement(user.id)
  }

  @Query(() => [AccountTypeEnum], { name: 'accountTypes' })
  accountTypes() {
    return this.accountService.findAccountTypes()
  }

  @Query(() => Account, { name: 'account' })
  findOne(@GetUser() user: User, @Args('id', { type: () => ID }) id: string) {
    return this.accountService.findOne(id, user.id)
  }

  // @Mutation(() => Account)
  // updateAccount(
  //   @GetUser() user: User,
  //   @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  // ) {
  //   return this.accountService.update(user.id, updateAccountInput);
  // }

  // @Mutation(() => Account)
  // removeAccount(
  //   @GetUser() user: User,
  //   @Args('id', { type: () => ID }) id: string,
  // ) {
  //   return this.accountService.remove(id, user.id);
  // }
}
