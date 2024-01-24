/*
  Warnings:

  - You are about to drop the `Adresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adresses" DROP CONSTRAINT "Adresses_user_id_fkey";

-- DropTable
DROP TABLE "Adresses";

-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "codeAdress" INTEGER NOT NULL,
    "descriptionAdress" TEXT NOT NULL,
    "create_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
