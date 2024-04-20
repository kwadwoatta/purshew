ALTER TABLE "transactions" DROP CONSTRAINT "transactions_debit_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_credit_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "debit_account_account_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "credit_account_account_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debit_account_account_id_accounts_id_fk" FOREIGN KEY ("debit_account_account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_credit_account_account_id_accounts_id_fk" FOREIGN KEY ("credit_account_account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
