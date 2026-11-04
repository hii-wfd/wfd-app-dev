"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

export async function clearAuditLog() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") throw new Error("Not available");
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error("Not authorized");

  await prisma.$executeRaw`TRUNCATE TABLE "AuditLog"`;

  // Leave a record of the wipe itself.
  await audit({
    actor: { id: Number(session.user.id), email: session.user.email, role: session.user.role },
    action: "DELETE",
    resourceType: "AuditLog",
  });
  revalidatePath("/admin/audit-log");
}
