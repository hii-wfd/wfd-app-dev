-- AlterTable
ALTER TABLE "storedFile" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "storedFile_deletedAt_idx" ON "storedFile"("deletedAt");

-- CreateIndex
CREATE INDEX "storedFile_createdById_idx" ON "storedFile"("createdById");

-- CreateIndex
CREATE INDEX "storedFile_deletedById_idx" ON "storedFile"("deletedById");

-- AddForeignKey
ALTER TABLE "storedFile" ADD CONSTRAINT "storedFile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storedFile" ADD CONSTRAINT "storedFile_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storedFile" ADD CONSTRAINT "storedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
