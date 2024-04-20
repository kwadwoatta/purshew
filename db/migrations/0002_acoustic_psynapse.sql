ALTER TABLE "cash" RENAME COLUMN "cash_value" TO "amount";--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_receivable" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "cash" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "item_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "purchase_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "sale_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "property_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "property_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ALTER COLUMN "item_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ALTER COLUMN "purchase_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ALTER COLUMN "sale_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "retained_earnings" ALTER COLUMN "earnings" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ALTER COLUMN "item_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ALTER COLUMN "purchase_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ALTER COLUMN "sale_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "general_expense" ALTER COLUMN "expense_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "general_expense" ALTER COLUMN "expense_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_expense" ALTER COLUMN "interest" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rent_expense" ALTER COLUMN "rent" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "salary_expense" ALTER COLUMN "expense_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "salary_expense" ALTER COLUMN "expense_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "wages_expense" ALTER COLUMN "wages" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ALTER COLUMN "item_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ALTER COLUMN "purchase_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ALTER COLUMN "sale_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "bonds_payable" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "credit_card_payable" ALTER COLUMN "card_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_card_payable" ALTER COLUMN "card_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_payable" ALTER COLUMN "loan_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_payable" ALTER COLUMN "loan_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "unearned_revenue" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "interest_revenue" ALTER COLUMN "interest_amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "revenue" ALTER COLUMN "revenue_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "revenue" ALTER COLUMN "amount" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "sales_amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "service_revenue" ALTER COLUMN "service_fee" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "office_equipment" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "common_stock" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "retained_earnings" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_of_goods_sold" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "general_expense" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_expense" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "rent_expense" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "salary_expense" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "wages_expense" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_card_payable" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_payable" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "interest_revenue" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;--> statement-breakpoint
ALTER TABLE "service_revenue" ADD COLUMN "amount" numeric DEFAULT '0.0' NOT NULL;