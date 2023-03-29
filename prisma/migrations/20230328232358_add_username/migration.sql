/*
  Warnings:

  - Added the required column `username_id` to the `baseInventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "baseInventario" ADD COLUMN     "username_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "baseInventario" ADD CONSTRAINT "baseInventario_username_id_fkey" FOREIGN KEY ("username_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
