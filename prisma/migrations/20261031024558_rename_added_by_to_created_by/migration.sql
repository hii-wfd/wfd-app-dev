/*
  Warnings:

  - You are about to drop the column `addedById` on the `StoredFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoredFile" DROP CONSTRAINT "StoredFile_addedById_fkey";

-- DropIndex
DROP INDEX "StoredFile_addedById_idx";

-- AlterTable
ALTER TABLE "StoredFile" DROP COLUMN "addedById",
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "StoredFile_createdById_idx" ON "StoredFile"("createdById");

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
