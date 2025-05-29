/*
  Warnings:

  - You are about to drop the `Oda` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `oda` to the `Konaklama` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Konaklama" DROP CONSTRAINT "Konaklama_odaId_fkey";

-- AlterTable
ALTER TABLE "Konaklama" ADD COLUMN     "oda" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Oda";
