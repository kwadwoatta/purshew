DO $$ BEGIN
 CREATE TYPE "transaction_type" AS ENUM('credit', 'debit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "accounts_receivable" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "cash" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "office_equipment" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "capital" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "retained_earnings" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "general_expense" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_expense" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "rent_expense" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "salary_expense" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "wages_expense" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "bonds_payable" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_card_payable" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_payable" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "unearned_revenue" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_revenue" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "revenue" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "service_revenue" ADD COLUMN "transaction_type" "transaction_type" NOT NULL;