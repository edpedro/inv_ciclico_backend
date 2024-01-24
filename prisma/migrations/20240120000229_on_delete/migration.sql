-- DropForeignKey
ALTER TABLE "Adresses" DROP CONSTRAINT "Adresses_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Adresses" ADD CONSTRAINT "Adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
