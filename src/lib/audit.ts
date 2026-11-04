import "server-only";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { AuditAction, AuditOutcome, DataClassification } from "@/generated/prisma/enums";

export type Actor = { id: number; email?: string | null; role?: string } | null;

export async function audit(e: {
  actor: Actor; // null = system
  action: AuditAction;
  resourceType: string;
  resourceId?: string | number;
  classification?: DataClassification;
  outcome?: AuditOutcome;
  details?: Record<string, string | number | boolean>;
}) {
  const ipAddress = await headers().then(
    (h) => h.get("x-forwarded-for")?.split(",")[0].trim(),
    () => undefined,
  );
  try {
    await prisma.auditLog.create({
      data: {
        userId: e.actor?.id,
        userEmail: e.actor?.email ?? "system",
        userRole: e.actor?.role,
        action: e.action,
        resourceType: e.resourceType,
        resourceId: e.resourceId?.toString(),
        classification: e.classification,
        outcome: e.outcome,
        ipAddress,
        details: e.details,
      },
    });
    return true;
  } catch (err) {
    console.error("audit write failed", err);
    return false;
  }
}  // change when migrating to Microsoft Sentinel
