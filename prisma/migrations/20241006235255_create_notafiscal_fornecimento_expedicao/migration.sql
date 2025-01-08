-- CreateTable
CREATE TABLE "baseNotaFiscal" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "quantityNF" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "quantityPhysical" DOUBLE PRECISION NOT NULL,
    "supply" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "baseExpedicao_id" TEXT NOT NULL,

    CONSTRAINT "baseNotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseFornecimento" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "baseFornecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baseExpedicao" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "upload" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "create_id" TEXT NOT NULL,

    CONSTRAINT "baseExpedicao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "baseNotaFiscal" ADD CONSTRAINT "baseNotaFiscal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baseNotaFiscal" ADD CONSTRAINT "baseNotaFiscal_baseExpedicao_id_fkey" FOREIGN KEY ("baseExpedicao_id") REFERENCES "baseExpedicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baseFornecimento" ADD CONSTRAINT "baseFornecimento_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baseExpedicao" ADD CONSTRAINT "baseExpedicao_create_id_fkey" FOREIGN KEY ("create_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
