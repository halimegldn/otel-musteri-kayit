/*
  Warnings:

  - You are about to drop the `Accomodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_roomId_fkey";

-- DropTable
DROP TABLE "Accomodation";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Room";

-- CreateTable
CREATE TABLE "Musteri" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "adres" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Musteri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Konaklama" (
    "id" TEXT NOT NULL,
    "musteriId" TEXT,
    "odaId" TEXT,
    "tutar" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Konaklama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oda" (
    "id" TEXT NOT NULL,
    "numara" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Musteri_email_key" ON "Musteri"("email");

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "Oda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
