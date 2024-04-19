ALTER TABLE "accounts_receivable" ADD COLUMN "account_type" "account_type" DEFAULT 'asset' NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment" ADD COLUMN "account_type" "account_type" DEFAULT 'asset' NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "account_type" "account_type" DEFAULT 'asset' NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "account_type" "account_type" DEFAULT 'asset' NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ADD COLUMN "account_type" "account_type" DEFAULT 'equity' NOT NULL;--> statement-breakpoint
ALTER TABLE "retained_earnings" ADD COLUMN "account_type" "account_type" DEFAULT 'equity' NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ADD COLUMN "account_type" "account_type" DEFAULT 'expense' NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_expense" ADD COLUMN "account_type" "account_type" DEFAULT 'expense' NOT NULL;--> statement-breakpoint
ALTER TABLE "rent_expense" ADD COLUMN "account_type" "account_type" DEFAULT 'expense' NOT NULL;--> statement-breakpoint
ALTER TABLE "wages_expense" ADD COLUMN "account_type" "account_type" DEFAULT 'expense' NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ADD COLUMN "account_type" "account_type" DEFAULT 'liability' NOT NULL;--> statement-breakpoint
ALTER TABLE "bonds_payable" ADD COLUMN "account_type" "account_type" DEFAULT 'liability' NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ADD COLUMN "account_type" "account_type" DEFAULT 'liability' NOT NULL;--> statement-breakpoint
ALTER TABLE "unearned_revenue" ADD COLUMN "account_type" "account_type" DEFAULT 'liability' NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_revenue" ADD COLUMN "account_type" "account_type" DEFAULT 'revenue' NOT NULL;--> statement-breakpoint
ALTER TABLE "revenue" ADD COLUMN "account_type" "account_type" DEFAULT 'revenue' NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "account_type" "account_type" DEFAULT 'revenue' NOT NULL;--> statement-breakpoint
ALTER TABLE "service_revenue" ADD COLUMN "account_type" "account_type" DEFAULT 'revenue' NOT NULL;