import { prisma } from "@/lib/prisma";
import { formatRemaining } from "@/lib/fileQueries";
import { purgeFile } from "@/lib/fileActions";
import SearchBox from "@/components/FileSearchBox";

export const dynamic = "force-dynamic";

export default async function RecoverableFilesPage({searchParams}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const devMode = process.env.ENABLE_DEV_TOOLS === "true";

  const match = (field: string) => ({ [field]: { contains: term, mode: "insensitive" as const } });

  const files = await prisma.storedFile.findMany({
    where: {
      deletedAt: { not: null },
      ...(term && {
        OR: [
          match("name"),
          { addedBy: match("name") },
          { deletedBy: match("name") },
        ],
      }),
    },
    include: { addedBy: true, deletedBy: true },
    orderBy: { deletedAt: "asc" }, // soonest to be deleted first
  });

  return (
    <main className="container py-5">
      <h1>Recoverable Files ({files.length})</h1>
      <SearchBox />

      <table className="table align-middle">
        <thead>
        <tr>
          <th>File</th><th>Added by</th><th>Deleted by</th><th>Time left</th>
          {devMode && <th />}
        </tr>
        </thead>
        <tbody>
        {files.map((f) => (
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.addedBy?.name ?? "Unknown"}</td>
            <td>{f.deletedBy?.name ?? "Unknown"}</td>
            <td>{formatRemaining(f.deletedAt!)}</td>
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
          <tr><td colSpan={devMode ? 5 : 4} className="text-muted">No matching files.</td></tr>
        )}
        </tbody>
      </table>
    </main>
  );
}
