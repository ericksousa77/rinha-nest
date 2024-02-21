-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('credit', 'debit');

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL(12,0) NOT NULL,
    "limit" DECIMAL(12,0) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "amount" DECIMAL(12,0) NOT NULL,
    "type" "TRANSACTION_TYPE" NOT NULL,
    "description" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clients_id_limit_balance_idx" ON "clients"("id", "limit", "balance");

-- CreateIndex
CREATE INDEX "client_id_index" ON "transactions"("client_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "clients" ("balance","limit")
  VALUES
    (0,1000 * 100),
    (0,800 * 100),
    (0,10000 * 100),
    (0,100000 * 100),
    (0,5000 * 100);