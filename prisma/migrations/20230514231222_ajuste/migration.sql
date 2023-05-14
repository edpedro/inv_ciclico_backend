/*
  Warnings:

  - You are about to drop the column `saldoFisico` on the `baseInventario` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `baseInventario` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `baseNameInventario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "baseInventario" DROP COLUMN "saldoFisico",
DROP COLUMN "status",
ADD COLUMN     "firstCount" DOUBLE PRECISION,
ADD COLUMN     "firstStatus" BOOLEAN DEFAULT false,
ADD COLUMN     "secondCount" DOUBLE PRECISION,
ADD COLUMN     "secondStatus" BOOLEAN;

-- AlterTable
ALTER TABLE "baseNameInventario" DROP COLUMN "status",
ADD COLUMN     "firstStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "secondStatus" BOOLEAN;
