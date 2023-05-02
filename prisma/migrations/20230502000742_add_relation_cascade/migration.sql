-- DropForeignKey
ALTER TABLE "NameInventarioOnUsers" DROP CONSTRAINT "NameInventarioOnUsers_user_id_fkey";

-- AddForeignKey
ALTER TABLE "NameInventarioOnUsers" ADD CONSTRAINT "NameInventarioOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
