import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTemplateResolver } from './transaction_template.resolver';
import { TransactionTemplateService } from './transaction_template.service';

describe('TransactionTemplateResolver', () => {
  let resolver: TransactionTemplateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionTemplateResolver, TransactionTemplateService],
    }).compile();

    resolver = module.get<TransactionTemplateResolver>(TransactionTemplateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
