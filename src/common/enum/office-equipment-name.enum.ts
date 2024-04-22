import { registerEnumType } from '@nestjs/graphql'
import { pgEnum } from 'drizzle-orm/pg-core'

export enum OfficeEquipmentNameEnum {
  COMPUTER = 'COMPUTER',
  PRINTER = 'PRINTER',
  DESK = 'DESK',
  CHAIR = 'CHAIR',
}

registerEnumType(OfficeEquipmentNameEnum, {
  name: 'OfficeEquipmentNameEnum',
})

const officeEquipmentName = Object.values(OfficeEquipmentNameEnum) as [
  OfficeEquipmentNameEnum,
  ...OfficeEquipmentNameEnum[],
]

export const officeEquipmentNameEnum = pgEnum<
  OfficeEquipmentNameEnum,
  [OfficeEquipmentNameEnum, ...OfficeEquipmentNameEnum[]]
>('office_equipment_name', officeEquipmentName)
