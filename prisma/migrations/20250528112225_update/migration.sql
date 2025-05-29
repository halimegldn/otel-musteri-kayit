/*
  Warnings:

  - You are about to drop the column `odaNumarası` on the `Konaklama` table. All the data in the column will be lost.
  - Added the required column `odaNumarasi` to the `Konaklama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Konaklama" DROP COLUMN "odaNumarası",
ADD COLUMN     "odaNumarasi" DOUBLE PRECISION NOT NULL;
