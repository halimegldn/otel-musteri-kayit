/*
  Warnings:

  - You are about to drop the `Odeme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tutar` to the `Konaklama` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Odeme" DROP CONSTRAINT "Odeme_konaklamaId_fkey";

-- AlterTable
ALTER TABLE "Konaklama" ADD COLUMN     "tutar" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Odeme";
