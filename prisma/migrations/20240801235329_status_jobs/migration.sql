-- CreateTable
CREATE TABLE "statusJobUser" (
    "id" TEXT NOT NULL,
    "jobN" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "statusJobUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "statusJobUser" ADD CONSTRAINT "statusJobUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
