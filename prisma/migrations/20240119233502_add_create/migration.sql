/*
  Warnings:

  - Added the required column `create_id` to the `Adresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adresses" ADD COLUMN     "create_id" TEXT NOT NULL;
