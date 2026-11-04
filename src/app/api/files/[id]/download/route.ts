import { get } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = Number(session?.user?.id);
  if (!session?.user || Number.isNaN(userId)) return new Response("Unauthorized", { status: 401 });

  const fileId = Number((await params).id);
  if (!Number.isInteger(fileId)) return new Response("Not found", { status: 404 });

  const file = await prisma.storedFile.findFirst({ where: { id: fileId, deletedAt: null } });
  if (!file) return new Response("Not found", { status: 404 });

  const result = await get(file.pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return new Response("Not found", { status: 404 });

  // Fail closed: no audit record, no file.
  const logged = await audit({
    actor: { id: userId, email: session.user.email, role: session.user.role },
    action: "READ",
    resourceType: "StoredFile",
    resourceId: file.id,
    classification: file.classification,
  });
  if (!logged) return new Response("Audit unavailable", { status: 503 });

  return new Response(result.stream, {
    headers: {
      "content-type": result.blob.contentType,
      "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      "x-content-type-options": "nosniff",
    },
  });
}
