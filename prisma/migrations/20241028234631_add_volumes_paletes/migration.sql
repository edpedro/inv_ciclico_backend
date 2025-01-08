-- AlterTable
ALTER TABLE "baseExpedicao" ADD COLUMN     "pallet" DOUBLE PRECISION,
ADD COLUMN     "volumes" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "baseNotaFiscal" ADD COLUMN     "conference_user_id" TEXT;
