/*
  Warnings:

  - You are about to drop the column `odaNumarasi` on the `Konaklama` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Konaklama" DROP COLUMN "odaNumarasi",
ADD COLUMN     "odaId" TEXT;

-- CreateTable
CREATE TABLE "Oda" (
    "id" TEXT NOT NULL,
    "numara" TEXT NOT NULL,

    CONSTRAINT "Oda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "Oda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
