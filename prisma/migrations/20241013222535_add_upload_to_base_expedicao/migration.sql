/*
  Warnings:

  - You are about to drop the column `upload` on the `baseExpedicao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "baseExpedicao" DROP COLUMN "upload",
ADD COLUMN     "uploadExcel" BOOLEAN DEFAULT false,
ADD COLUMN     "uploadPDF" BOOLEAN DEFAULT false;
