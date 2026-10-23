import "server-only";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { retentionMs } from "@/lib/fileQueries";

// Single place that removes a file: bytes first, then the row.
export async function purgeStoredFiles(file: { id: number; url: string }) {
  await del(file.url);
  await prisma.storedFile.delete({ where: { id: file.id } });
}

export async function purgeExpiredFiles() {
  const cutoff = new Date(Date.now() - retentionMs());

  const expired = await prisma.storedFile.findMany({
    where: { deletedAt: { lt: cutoff } },
    take: 100, // batch cap
  });

  let purged = 0;
  const failed: number[] = [];

  for (const f of expired) {
    try {
      await purgeStoredFiles(f);
      purged++;
    } catch (e) {
      console.error("purge failed", f.id, e);
      failed.push(f.id); // row stays, next run retries
    }
  }
  return { purged, failed, cutoff };
}
