/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[code]` on the table `Cell`. If there are existing duplicate values, the migration will fail.
  - Added the required column `code` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cell" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cell.code_unique" ON "Cell"("code");
