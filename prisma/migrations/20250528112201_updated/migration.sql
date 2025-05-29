/*
  Warnings:

  - You are about to drop the column `oda` on the `Konaklama` table. All the data in the column will be lost.
  - Added the required column `odaNumarası` to the `Konaklama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Konaklama" DROP COLUMN "oda",
ADD COLUMN     "odaNumarası" DOUBLE PRECISION NOT NULL;
