DO $$ BEGIN
 CREATE TYPE "cash_name" AS ENUM('US_DOLLAR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "office_equipment_name" AS ENUM('COMPUTER', 'PRINTER', 'DESK', 'CHAIR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "transaction_template_type" AS ENUM('cash_sale', 'cash_purchase', 'account_payable_purchase', 'account_payable_payment', 'sales_invoice', 'sales_receipt', 'expense', 'salary_payment', 'purchase_on_credit', 'debt_consolidation', 'credit_card_payoff', 'equipment_purchase');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cash" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cash_name" "cash_name" DEFAULT 'US_DOLLAR' NOT NULL,
	"cash_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'asset' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "office_equipment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"office_equipment_name" "office_equipment_name" DEFAULT 'COMPUTER' NOT NULL,
	"office_equipment_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'asset' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "general_expense" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"expense_name" text NOT NULL,
	"expense_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'expense' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "salary_expense" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"expense_name" text NOT NULL,
	"expense_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'expense' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit_card_payable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"card_name" text NOT NULL,
	"card_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'liability' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loan_payable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"loan_name" text NOT NULL,
	"loan_value" numeric NOT NULL,
	"account_type" "account_type" DEFAULT 'liability' NOT NULL,
	"account_id" uuid NOT NULL,
	"owner_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"type" "transaction_template_type" NOT NULL,
	"description" text NOT NULL,
	"balancing_transaction" text NOT NULL,
	"debit_account_name" text NOT NULL,
	"credit_account_name" text NOT NULL,
	"debit_account_account_type" "account_type" NOT NULL,
	"credit_account_account_type" "account_type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "to_account_id" TO "debit_account_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "from_account_id" TO "credit_account_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_from_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_to_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debit_account_id_accounts_id_fk" FOREIGN KEY ("debit_account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_credit_account_id_accounts_id_fk" FOREIGN KEY ("credit_account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "transaction_type";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cash" ADD CONSTRAINT "cash_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cash" ADD CONSTRAINT "cash_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_equipment" ADD CONSTRAINT "office_equipment_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "office_equipment" ADD CONSTRAINT "office_equipment_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "general_expense" ADD CONSTRAINT "general_expense_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "general_expense" ADD CONSTRAINT "general_expense_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "salary_expense" ADD CONSTRAINT "salary_expense_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "salary_expense" ADD CONSTRAINT "salary_expense_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_payable" ADD CONSTRAINT "credit_card_payable_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credit_card_payable" ADD CONSTRAINT "credit_card_payable_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan_payable" ADD CONSTRAINT "loan_payable_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan_payable" ADD CONSTRAINT "loan_payable_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
