"use server";

import { revalidatePath } from "next/cache";
import { purgeStoredFiles } from "@/lib/filePurge";
import { prisma } from "@/lib/prisma";

function assertDevTools() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") throw new Error("Not available");
}

const REVALIDATE = "/dev/files"

export async function registerFile(input: {
  name: string;
  url: string;
  pathname: string;
  contentType?: string;
  size: number;
}) {
  assertDevTools();
  await prisma.storedFile.create({ data: input });
  revalidatePath(REVALIDATE);
}

export async function softDeleteFile(id: number) {
  assertDevTools();
  await prisma.storedFile.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath(REVALIDATE);
}

export async function restoreFile(id: number) {
  assertDevTools();
  await prisma.storedFile.update({ where: { id }, data: { deletedAt: null } });
  revalidatePath(REVALIDATE);
}

export async function purgeFile(id: number) {
  assertDevTools();
  const file = await prisma.storedFile.findFirstOrThrow({
    where: { id, deletedAt: { not: null } },
  });
  await purgeStoredFiles(file);
  revalidatePath(REVALIDATE);
}
