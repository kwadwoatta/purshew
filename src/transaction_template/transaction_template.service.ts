import { Injectable } from '@nestjs/common';
import { CreateTransactionTemplateInput } from './dto/create-transaction_template.input';
import { UpdateTransactionTemplateInput } from './dto/update-transaction_template.input';

@Injectable()
export class TransactionTemplateService {
  create(createTransactionTemplateInput: CreateTransactionTemplateInput) {
    return 'This action adds a new transactionTemplate';
  }

  findAll() {
    return `This action returns all transactionTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionTemplate`;
  }

  update(id: number, updateTransactionTemplateInput: UpdateTransactionTemplateInput) {
    return `This action updates a #${id} transactionTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionTemplate`;
  }
}
