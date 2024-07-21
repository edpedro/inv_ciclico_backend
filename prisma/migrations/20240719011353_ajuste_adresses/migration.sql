/*
  Warnings:

  - You are about to drop the column `date` on the `adresses` table. All the data in the column will be lost.
  - Added the required column `codeAdress` to the `adresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "date",
ADD COLUMN     "codeAdress" INTEGER NOT NULL;
