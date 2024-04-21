import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accounts } from '../accounts'

export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  email: text('email').unique().notNull(),

  name: text('name'),
  hash: text('hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))
