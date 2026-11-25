import "server-only";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { retentionMs } from "@/lib/fileQueries";

// Remove the stored file from Blob storage and then remove its database row.
export async function purgeStoredFiles(file: { id: number; url: string }) {
  await del(file.url);
  await prisma.storedFile.delete({ where: { id: file.id } });
}

// Find and permanently remove files that have exceeded the retention period.
export async function purgeExpiredFiles() {
  const cutoff = new Date(Date.now() - retentionMs());

  const expired = await prisma.storedFile.findMany({
    where: {
      deletedAt: {
        lt: cutoff,
      },
    },
    take: 100,
  });

  let purged = 0;
  const failed: number[] = [];

  for (const file of expired) {
    try {
      await purgeStoredFiles(file);
      purged++;
    } catch (error) {
      console.error("File purge failed:", file.id, error);
      failed.push(file.id);
    }
  }

  return { purged, failed, cutoff };
}
