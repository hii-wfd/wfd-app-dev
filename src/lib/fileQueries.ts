import { prisma } from "@/lib/prisma";

export const listActiveFiles = () =>
  prisma.storedFile.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });

export const listDeletedFiles = () =>
  prisma.storedFile.findMany({ where: { deletedAt: { not: null } }, orderBy: { deletedAt: "desc" } });
