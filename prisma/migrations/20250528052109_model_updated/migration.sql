-- AddForeignKey
ALTER TABLE "Konaklama" ADD CONSTRAINT "Konaklama_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE SET NULL ON UPDATE CASCADE;
