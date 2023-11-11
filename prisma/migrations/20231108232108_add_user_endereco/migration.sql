-- AlterTable
ALTER TABLE "baseInventario" ADD COLUMN     "user_endereco_id" TEXT;

-- AddForeignKey
ALTER TABLE "baseInventario" ADD CONSTRAINT "baseInventario_user_endereco_id_fkey" FOREIGN KEY ("user_endereco_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
