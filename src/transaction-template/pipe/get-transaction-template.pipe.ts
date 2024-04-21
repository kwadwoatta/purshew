import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { TransactionTemplateTypeEnum } from 'src/common'
import { transactionTemplates } from 'src/drizzle/schema'
import { DrizzleService } from '../../drizzle/drizzle.service'

@Injectable()
export class GetTransactionTemplatePipe implements PipeTransform {
  constructor(readonly drizzle: DrizzleService) {}

  async transform({
    txTemplateType,
  }: {
    txTemplateType?: TransactionTemplateTypeEnum
  }) {
    const templates = await this.drizzle.db.select().from(transactionTemplates)

    if (!templates || templates.length === 0) {
      throw new NotFoundException('no templates found')
    }

    if (txTemplateType) {
      return templates.find((t) => t.type === txTemplateType)
    }

    return templates
  }
}
