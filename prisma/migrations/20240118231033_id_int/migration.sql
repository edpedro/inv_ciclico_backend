/*
  Warnings:

  - The primary key for the `Adresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Adresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Adresses" DROP CONSTRAINT "Adresses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Adresses_pkey" PRIMARY KEY ("id");
