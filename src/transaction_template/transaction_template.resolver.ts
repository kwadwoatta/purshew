import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionTemplateService } from './transaction_template.service';
import { TransactionTemplate } from './entities/transaction_template.entity';
import { CreateTransactionTemplateInput } from './dto/create-transaction_template.input';
import { UpdateTransactionTemplateInput } from './dto/update-transaction_template.input';

@Resolver(() => TransactionTemplate)
export class TransactionTemplateResolver {
  constructor(private readonly transactionTemplateService: TransactionTemplateService) {}

  @Mutation(() => TransactionTemplate)
  createTransactionTemplate(@Args('createTransactionTemplateInput') createTransactionTemplateInput: CreateTransactionTemplateInput) {
    return this.transactionTemplateService.create(createTransactionTemplateInput);
  }

  @Query(() => [TransactionTemplate], { name: 'transactionTemplate' })
  findAll() {
    return this.transactionTemplateService.findAll();
  }

  @Query(() => TransactionTemplate, { name: 'transactionTemplate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionTemplateService.findOne(id);
  }

  @Mutation(() => TransactionTemplate)
  updateTransactionTemplate(@Args('updateTransactionTemplateInput') updateTransactionTemplateInput: UpdateTransactionTemplateInput) {
    return this.transactionTemplateService.update(updateTransactionTemplateInput.id, updateTransactionTemplateInput);
  }

  @Mutation(() => TransactionTemplate)
  removeTransactionTemplate(@Args('id', { type: () => Int }) id: number) {
    return this.transactionTemplateService.remove(id);
  }
}
