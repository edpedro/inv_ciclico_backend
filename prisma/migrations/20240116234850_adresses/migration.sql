-- CreateTable
CREATE TABLE "Adresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "codeAdress" INTEGER NOT NULL,
    "descriptionAdress" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Adresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adresses" ADD CONSTRAINT "Adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
