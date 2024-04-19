ALTER TABLE "accounts_receivable" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "equipment" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "inventory" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "property" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "common_stock" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "retained_earnings" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "interest_expense" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "rent_expense" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "wages_expense" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "accounts_payable" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "bonds_payable" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "loans" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "unearned_revenue" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "interest_revenue" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "revenue" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "sales" DROP COLUMN IF EXISTS "account_type";--> statement-breakpoint
ALTER TABLE "service_revenue" DROP COLUMN IF EXISTS "account_type";