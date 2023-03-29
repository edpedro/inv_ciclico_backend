-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseInventario" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "tipoEstoque" TEXT NOT NULL,
    "catItem" TEXT NOT NULL,
    "saldoWms" DOUBLE PRECISION NOT NULL,
    "saldoFisico" DOUBLE PRECISION,
    "status" BOOLEAN DEFAULT false,
    "baseNameInventario_id" TEXT NOT NULL,

    CONSTRAINT "baseInventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseNameInventario" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "create_id" TEXT NOT NULL,

    CONSTRAINT "baseNameInventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameInventarioOnUsers" (
    "user_id" TEXT NOT NULL,
    "nameInventario_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "NameInventarioOnUsers_pkey" PRIMARY KEY ("user_id","nameInventario_id")
);

-- AddForeignKey
ALTER TABLE "baseInventario" ADD CONSTRAINT "baseInventario_baseNameInventario_id_fkey" FOREIGN KEY ("baseNameInventario_id") REFERENCES "baseNameInventario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baseNameInventario" ADD CONSTRAINT "baseNameInventario_create_id_fkey" FOREIGN KEY ("create_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameInventarioOnUsers" ADD CONSTRAINT "NameInventarioOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NameInventarioOnUsers" ADD CONSTRAINT "NameInventarioOnUsers_nameInventario_id_fkey" FOREIGN KEY ("nameInventario_id") REFERENCES "baseNameInventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
