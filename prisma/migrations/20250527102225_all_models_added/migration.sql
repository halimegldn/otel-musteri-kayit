-- CreateTable
CREATE TABLE "Konaklama" (
    "id" TEXT NOT NULL,
    "musteriId" INTEGER,
    "odaId" TEXT,

    CONSTRAINT "Konaklama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Odeme" (
    "id" TEXT NOT NULL,
    "tutar" DOUBLE PRECISION NOT NULL,
    "konaklamaId" TEXT NOT NULL,

    CONSTRAINT "Odeme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oda" (
    "id" TEXT NOT NULL,
    "numara" TEXT NOT NULL,

    CONSTRAINT "Oda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Odeme_konaklamaId_key" ON "Odeme"("konaklamaId");

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "Oda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odeme" ADD CONSTRAINT "Odeme_konaklamaId_fkey" FOREIGN KEY ("konaklamaId") REFERENCES "Konaklama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
