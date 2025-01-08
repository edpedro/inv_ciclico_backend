/*
  Warnings:

  - You are about to drop the column `conference_user_id` on the `baseNotaFiscal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "baseNotaFiscal" DROP COLUMN "conference_user_id",
ADD COLUMN     "conference_user" TEXT;
