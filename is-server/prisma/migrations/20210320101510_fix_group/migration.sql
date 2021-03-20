/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Item` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[code]` on the table `Group`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Group.code_unique" ON "Group"("code");
