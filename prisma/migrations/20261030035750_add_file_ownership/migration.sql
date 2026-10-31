-- CreateTable
CREATE TABLE "StoredFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pathname" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER NOT NULL,
    "addedById" INTEGER,
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
CREATE INDEX "StoredFile_addedById_idx" ON "StoredFile"("addedById");

-- CreateIndex
CREATE INDEX "StoredFile_deletedById_idx" ON "StoredFile"("deletedById");

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
