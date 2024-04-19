// import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
// import { accounts } from 'src/drizzle/schemas';

// accounts.type.enumValues

// @ObjectType()
// export class Asset {
//   @Field()
//   value: string;
// }

// @ObjectType()
// export class Liability {
//   @Field()
//   value: string;
// }

// @ObjectType()
// export class Equity {
//   @Field()
//   value: string;
// }

// @ObjectType()
// export class Revenue {
//   @Field()
//   value: string;
// }

// @ObjectType()
// export class Expense {
//   @Field()
//   value: string;
// }

// export const AccountTypeEnumUnion = createUnionType({
//   name: 'AccountTypeEnumUnion',
//   types: () => [Asset, Liability, Equity, Revenue, Expense] as const,
//   resolveType: (a) => {},
// });
