import { prisma } from "@/lib/prisma";

const DAY_MS = 86_400_000
export const DEFAULT_RETENTION_SECONDS = 30 * 24 * 60 * 60; // 30 days

export const listActiveFiles = () =>
  prisma.storedFile.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });

export const listDeletedFiles = () =>
  prisma.storedFile.findMany({ where: { deletedAt: { not: null } }, orderBy: { deletedAt: "desc" } });

export const retentionMs = () =>
  Number(process.env.TRASH_RETENTION_SECONDS ?? DEFAULT_RETENTION_SECONDS) * 1000;

export const msRemaining = (deletedAt: Date) =>
  deletedAt.getTime() + retentionMs() - Date.now();

export function formatRemaining(deletedAt: Date) {
  const ms = msRemaining(deletedAt);
  if (ms <= 0) return "Deleting soon";
  if (ms > DAY_MS) return `${Math.ceil(ms / DAY_MS)} days left`;
  if (ms > 3_600_000) return `${Math.ceil(ms / 3_600_000)} hours left`;
  if (ms > 60_000) return `${Math.ceil(ms / 60_000)} min left`;
  return `${Math.ceil(ms / 1000)}s left`; // useful with the 10-second test setting
}
