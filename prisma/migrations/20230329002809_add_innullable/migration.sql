-- DropForeignKey
ALTER TABLE "baseInventario" DROP CONSTRAINT "baseInventario_username_id_fkey";

-- AlterTable
ALTER TABLE "baseInventario" ALTER COLUMN "username_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "baseInventario" ADD CONSTRAINT "baseInventario_username_id_fkey" FOREIGN KEY ("username_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
