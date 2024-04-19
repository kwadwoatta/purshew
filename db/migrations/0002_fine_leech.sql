ALTER TABLE "accounts" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_type_unique" UNIQUE("account_type");