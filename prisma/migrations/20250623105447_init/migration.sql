-- CreateEnum
CREATE TYPE "WarningArea" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "Stay" ADD COLUMN     "warningState" "WarningArea" NOT NULL DEFAULT 'false';
