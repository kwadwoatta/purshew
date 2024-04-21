ALTER TABLE "transactions" ADD COLUMN "debit_amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "credit_amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "debit_account_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "credit_account_name" text NOT NULL;