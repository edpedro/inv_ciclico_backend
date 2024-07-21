/*
  Warnings:

  - You are about to drop the column `codeAdress` on the `adresses` table. All the data in the column will be lost.
  - Added the required column `date` to the `adresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "codeAdress",
ADD COLUMN     "date" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "nameProtocols" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "nameProtocols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protocols" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "caixa" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "nameProtocols_id" TEXT NOT NULL,

    CONSTRAINT "protocols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseSerial" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "deposit" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "baseSerial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nameProtocols" ADD CONSTRAINT "nameProtocols_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "protocols" ADD CONSTRAINT "protocols_nameProtocols_id_fkey" FOREIGN KEY ("nameProtocols_id") REFERENCES "nameProtocols"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baseSerial" ADD CONSTRAINT "baseSerial_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
