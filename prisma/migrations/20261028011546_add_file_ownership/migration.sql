/*
  Warnings:

  - You are about to drop the `storedFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "storedFile";

-- CreateTable
CREATE TABLE "StoredFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pathname" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER NOT NULL,
    "addedByID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedById" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_url_key" ON "StoredFile"("url");

-- CreateIndex
CREATE INDEX "StoredFile_deletedAt_idx" ON "StoredFile"("deletedAt");

-- CreateIndex
CREATE INDEX "StoredFile_addedByID_idx" ON "StoredFile"("addedByID");

-- CreateIndex
CREATE INDEX "StoredFile_deletedById_idx" ON "StoredFile"("deletedById");

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_addedByID_fkey" FOREIGN KEY ("addedByID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
