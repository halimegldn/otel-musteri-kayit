/*
  Warnings:

  - The primary key for the `Musteri` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Konaklama" DROP CONSTRAINT "Konaklama_musteriId_fkey";

-- AlterTable
ALTER TABLE "Konaklama" ALTER COLUMN "musteriId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Musteri" DROP CONSTRAINT "Musteri_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Musteri_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Musteri_id_seq";

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE SET NULL ON UPDATE CASCADE;
