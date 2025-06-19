/*
  Warnings:

  - You are about to drop the column `endDate` on the `Stay` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Stay` table. All the data in the column will be lost.
  - Added the required column `checkin` to the `Stay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkout` to the `Stay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stay" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "checkin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkout" TIMESTAMP(3) NOT NULL;
