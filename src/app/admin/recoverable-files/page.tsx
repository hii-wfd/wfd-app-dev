import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { auth } from '@/lib/auth';
import { adminProtectedPage } from "@/lib/page-protection"
import { formatRemaining } from "@/lib/fileQueries";
import { purgeFile, restoreFile } from "@/lib/fileActions";
import SearchBox from "@/components/FileSearchBox";

export const dynamic = "force-dynamic";

export default async function RecoverableFilesPage({searchParams}: {
  searchParams: Promise<{ q?: string }>;
}) {
  //const session = await auth();
  //adminProtectedPage(session as { user: { email: string; id: string; name: string } } | null,);

  const { q = "" } = await searchParams;
  const term = q.trim();
  const devMode = process.env.ENABLE_DEV_TOOLS === "true";

  const contains = (value: string): Prisma.StringFilter => ({
    contains: value,
    mode: "insensitive",
  });

  const where: Prisma.StoredFileWhereInput = {
    deletedAt: { not: null },
    ...(term
      ? {
        OR: [
          { name: contains(term) },
          { createdBy: { email: contains(term) } },
          { deletedBy: { email: contains(term) } },
        ],
      }
      : {}),
  };

  const files = await prisma.storedFile.findMany({
    where,
    include: {
      createdBy: { select: { email: true } },
      deletedBy: { select: { email: true } },
    },
    orderBy: { deletedAt: "asc" },
  });

  return (
    <main className="container py-5">
      <br />
      <br />
      <h1>Recoverable Files ({files.length})</h1>
      <SearchBox />

      <table className="table align-middle">
        <thead>
        <tr>
          <th>File</th>
          <th>Added by</th>
          <th>Deleted by</th>
          <th>Time left</th>
          <th>Recover</th>
          {devMode && <th />}
        </tr>
        </thead>
        <tbody>
        {files.map((f) => (
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.createdBy?.email ?? "Unknown"}</td>
            <td>{f.deletedBy?.email ?? "Unknown"}</td>
            <td>{formatRemaining(f.deletedAt!)}</td>
            <td>
              <form action={restoreFile.bind(null, f.id)}>
                <button className="btn btn-sm btn-success">Recover</button>
              </form>
            </td>
            {devMode && (
              <td>
                <form action={purgeFile.bind(null, f.id)}>
                  <button className="btn btn-sm btn-danger">Permanently delete</button>
                </form>
              </td>
            )}
          </tr>
        ))}
        {files.length === 0 && (
          <tr>
            <td colSpan={devMode ? 6 : 5} className="text-muted">
              No matching files.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </main>
  );
}
