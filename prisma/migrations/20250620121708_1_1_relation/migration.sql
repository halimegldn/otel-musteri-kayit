/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Stay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stay_roomId_key" ON "Stay"("roomId");
