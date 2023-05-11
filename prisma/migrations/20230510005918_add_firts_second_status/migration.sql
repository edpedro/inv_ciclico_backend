-- AlterTable
ALTER TABLE "baseInventario" ADD COLUMN     "firstCount" DOUBLE PRECISION,
ADD COLUMN     "firstStatus" BOOLEAN DEFAULT false,
ADD COLUMN     "secondCount" DOUBLE PRECISION,
ADD COLUMN     "secondStatus" BOOLEAN;
