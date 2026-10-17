"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const DEFAULT_RETENTION_SECONDS = 30 * 24 * 60 * 60; // 30 days

function assertDevTools() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") throw new Error("Not available");
}

export async function registerFile(input: {
  name: string;
  url: string;
  pathname: string;
  contentType?: string;
  size: number;
}) {
  assertDevTools();
  await prisma.storedFile.create({ data: input });
  revalidatePath("/dev/files");
}

export async function softDeleteFile(id: number) {
  assertDevTools();
  await prisma.storedFile.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/dev/files");
}

export async function restoreFile(id: number) {
  assertDevTools();
  await prisma.storedFile.update({ where: { id }, data: { deletedAt: null } });
  revalidatePath("/dev/files");
}

export async function purgeFile(id: number) {
  assertDevTools();
  const file = await prisma.storedFile.findFirstOrThrow({
    where: { id, deletedAt: { not: null } },
  });
  await del(file.url); // remove the bytes from Blob
  await prisma.storedFile.delete({ where: { id } });
  revalidatePath("/dev/files");
}

export async function purgeExpiredFiles() {
  const seconds = Number(process.env.TRASH_RETENTION_SECONDS ?? DEFAULT_RETENTION_SECONDS);
  const cutoff = new Date(Date.now() - seconds * 1000);

  const expired = await prisma.storedFile.findMany({
    where: { deletedAt: { lt: cutoff } }, // lt implies not null
    take: 100, // batch cap so one run can't time out
  });

  let purged = 0;
  const failed: number[] = [];

  for (const f of expired) {
    try {
      await del(f.url); // bytes first
      await prisma.storedFile.delete({ where: { id: f.id } }); // then the row
      purged++;
    } catch (e) {
      console.error("purge failed", f.id, e);
      failed.push(f.id); // row stays, so the next run retries it
    }
  }
  return { purged, failed, cutoff };
}
