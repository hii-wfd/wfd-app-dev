"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { Role, type AuditAction, type DataClassification } from "@/generated/prisma/enums";
import { purgeStoredFiles } from "@/lib/filePurge";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";


const REVALIDATE_PATHS = ["/dev/files", "/admin/recoverable-files"]
const revalidate = () => REVALIDATE_PATHS.forEach((p) => revalidatePath(p));

function assertDevTools() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") throw new Error("Not available");
}

async function requireUser() {
  const session = await auth();
  const id = Number(session?.user?.id);
  if (!session?.user || Number.isNaN(id)) throw new Error("Not signed in");
  return { id, email: session.user.email, role: session.user.role };
}

async function requireAdmin(action: AuditAction, resourceId: number) {
  const user = await requireUser();
  if (user.role !== Role.ADMIN) {
    await audit({ actor: user, action, resourceType: "StoredFile", resourceId, outcome: "DENIED" });
    throw new Error('Not authorized');
  }
  return user;
}

export async function registerFile(input: {
  name: string;
  url: string;
  pathname: string;
  contentType?: string;
  size: number;
  classification?: DataClassification;
}) {
  const user = await requireUser();
  const file = await prisma.storedFile.create({ data: { ...input, createdById: user.id } });
  await audit({
    actor: user,
    action: "CREATE",
    resourceType: "StoredFile",
    resourceId: file.id,
    classification: file.classification,
  });
  revalidate();
}

export async function softDeleteFile(id: number) {
  const user = await requireUser();
  const file = await prisma.storedFile.update({
    where: { id },
    data: { deletedAt: new Date(), deletedById: user.id },
  });
  await audit({
    actor: user,
    action: "DELETE",
    resourceType: "StoredFile",
    resourceId: id,
    classification: file.classification,
  });
  revalidate();
}

export async function restoreFile(id: number) {
  const user = await requireAdmin("RESTORE", id);
  const file = await prisma.storedFile.update({
    where: { id, deletedAt: { not: null } },
    data: { deletedAt: null, deletedById: null },
  });
  await audit({
    actor: user,
    action: "RESTORE",
    resourceType: "StoredFile",
    resourceId: id,
    classification: file.classification,
  });
  revalidate();
}

export async function purgeFile(id: number) {
  assertDevTools();
  const user = await requireUser();
  const file = await prisma.storedFile.findFirstOrThrow({
    where: { id, deletedAt: { not: null } },
  });
  await purgeStoredFiles(file, user);
  revalidate();
}
