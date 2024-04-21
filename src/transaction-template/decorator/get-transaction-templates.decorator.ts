import { createParamDecorator } from '@nestjs/common'

import { TransactionTemplateTypeEnum } from 'src/common'
import { GetTransactionTemplatePipe } from '../pipe/get-transaction-template.pipe'

const GetTransactionTemplateType = createParamDecorator(
  (txTemplateType: TransactionTemplateTypeEnum) => {
    return { txTemplateType }
  },
)

export const GetTransactionTemplates = (
  txTemplateType?: TransactionTemplateTypeEnum,
) => GetTransactionTemplateType(txTemplateType, GetTransactionTemplatePipe)
