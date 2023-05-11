/*
  Warnings:

  - You are about to drop the column `saldoFisico` on the `baseInventario` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `baseInventario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "baseInventario" DROP COLUMN "saldoFisico",
DROP COLUMN "status";
