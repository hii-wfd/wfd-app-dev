
"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const REVALIDATE_PATHS = ["/dev/files", "/admin/recoverable-files"];

function revalidate() {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
}

function assertDevTools() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") {
    throw new Error("Not available");
  }
}

async function requireUser() {
  const session = await auth();
  const id = Number(session?.user?.id);

  if (!session?.user || !Number.isInteger(id) || id <= 0) {
    throw new Error("Not signed in");
  }

  return {
    id,
    role: session.user.role,
  };
}

async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  return user;
}

export async function registerFile(input: {
  name: string;
  url: string;
  pathname: string;
  contentType?: string;
  size: number;
}) {
  const user = await requireUser();

  await prisma.storedFile.create({
    data: {
      ...input,
      addedById: user.id,
    },
  });

  revalidate();
}

export async function softDeleteFile(id: number) {
  const user = await requireUser();

  const result = await prisma.storedFile.updateMany({
    where: {
      id,
      deletedAt: null,
      OR: [
        { addedById: user.id },
        ...(user.role === Role.ADMIN ? [{}] : []),
      ],
    },
    data: {
      deletedAt: new Date(),
      deletedById: user.id,
    },
  });

  if (result.count === 0) {
    throw new Error("File not found or not authorized");
  }

  revalidate();
}

export async function restoreFile(id: number) {
  await requireAdmin();

  await prisma.storedFile.update({
    where: {
      id,
      deletedAt: { not: null },
    },
    data: {
      deletedAt: null,
      deletedById: null,
    },
  });

  revalidate();
}

// Permanent deletion: administrator only, and only for files in the trash.
export async function purgeFile(id: number) {
  assertDevTools();
  await requireAdmin();

  const file = await prisma.storedFile.findFirstOrThrow({
    where: {
      id,
      deletedAt: { not: null },
    },
  });

  await del(file.url);
  await prisma.storedFile.delete({
    where: { id },
  });

  revalidate();
}
