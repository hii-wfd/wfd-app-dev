"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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

// Permanent delete: only allowed for files already in the trash.
export async function purgeFile(id: number) {
  assertDevTools();
  const file = await prisma.storedFile.findFirstOrThrow({
    where: { id, deletedAt: { not: null } },
  });
  await del(file.url); // remove the bytes from Blob
  await prisma.storedFile.delete({ where: { id } }); // then the row
  revalidatePath("/dev/files");
}
