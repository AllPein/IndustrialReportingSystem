/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[code]` on the table `Equipment`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[code]` on the table `Pavilion`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipment.code_unique" ON "Equipment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Pavilion.code_unique" ON "Pavilion"("code");
