/*
  Warnings:

  - Added the required column `codigo` to the `baseFornecimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `baseNotaFiscal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "baseFornecimento" ADD COLUMN     "codigo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "baseNotaFiscal" ADD COLUMN     "codigo" TEXT NOT NULL,
ALTER COLUMN "quantityPhysical" DROP NOT NULL;
