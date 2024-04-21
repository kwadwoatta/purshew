import {
  type BuildQueryResult,
  type DBQueryConfig,
  type ExtractTablesWithRelations,
} from 'drizzle-orm'
import * as schema from 'src/drizzle/schema'

type Schema = typeof schema
type TSchema = ExtractTablesWithRelations<Schema>

type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with']

export type InferDrizzleModel<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With | undefined
  }
>

export type InferTableColumns<TableName extends keyof TSchema> =
  BuildQueryResult<
    TSchema,
    TSchema[TableName],
    {
      t: any
    }
  >
