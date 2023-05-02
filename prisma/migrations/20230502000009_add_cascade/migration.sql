-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_createdById_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
