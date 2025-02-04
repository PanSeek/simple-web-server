-- CreateEnum
CREATE TYPE "Action" AS ENUM ('PAYED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "balance" MONEY NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action" "Action" NOT NULL,
    "amount" MONEY NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
