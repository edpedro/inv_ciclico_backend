-- CreateTable
CREATE TABLE "UsersOnEnderecos" (
    "user_id" TEXT NOT NULL,
    "baseInventario_id" INTEGER NOT NULL,
    "baseNameInventario_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersOnEnderecos_pkey" PRIMARY KEY ("user_id","baseInventario_id")
);

-- AddForeignKey
ALTER TABLE "UsersOnEnderecos" ADD CONSTRAINT "UsersOnEnderecos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnEnderecos" ADD CONSTRAINT "UsersOnEnderecos_baseInventario_id_fkey" FOREIGN KEY ("baseInventario_id") REFERENCES "baseInventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnEnderecos" ADD CONSTRAINT "UsersOnEnderecos_baseNameInventario_id_fkey" FOREIGN KEY ("baseNameInventario_id") REFERENCES "baseNameInventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
