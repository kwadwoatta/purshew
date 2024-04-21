ALTER TYPE "transaction_template_type" ADD VALUE 'kwame_initial_capital';--> statement-breakpoint
ALTER TYPE "transaction_template_type" ADD VALUE 'kwame_system_unit_purchase';--> statement-breakpoint
ALTER TYPE "transaction_template_type" ADD VALUE 'kwame_system_unit_sale';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "capital" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"amount" numeric DEFAULT '0.0' NOT NULL,
	"capital_name" text NOT NULL,
	"account_type" "account_type" DEFAULT 'equity' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "capital" ADD CONSTRAINT "capital_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "capital" ADD CONSTRAINT "capital_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
