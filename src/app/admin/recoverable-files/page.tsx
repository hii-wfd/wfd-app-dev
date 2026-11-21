
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { adminProtectedPage } from "@/lib/page-protection";
import { prisma } from "@/lib/prisma";
import { formatRemaining } from "@/lib/fileQueries";
import { purgeFile, restoreFile } from "@/lib/fileActions";
import FileSearchBox from "@/components/FileSearchBox";

type RecoverableFilesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const dynamic = "force-dynamic";

export default async function RecoverableFilesPage({
  searchParams,
}: RecoverableFilesPageProps) {
  const session = await auth();

  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string; role?: string };
    } | null
  );

  const { q } = await searchParams;
  const term = q?.trim() ?? "";

  const where: Prisma.StoredFileWhereInput = {
    deletedAt: { not: null },
    ...(term
      ? {
          OR: [
            { name: { contains: term, mode: "insensitive" } },
            { addedBy: { email: { contains: term, mode: "insensitive" } } },
            { deletedBy: { email: { contains: term, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const files = await prisma.storedFile.findMany({
    where,
    include: {
      addedBy: { select: { email: true } },
      deletedBy: { select: { email: true } },
    },
    orderBy: { deletedAt: "asc" },
  });

  return (
    <main className="container py-4">
      <h1>Recoverable Files</h1>
      <p className="text-muted">
        Deleted files are retained for 30 days by default before permanent cleanup.
      </p>

      <FileSearchBox />

      <p>{files.length} deleted file(s) found.</p>

      {files.length === 0 ? (
        <p>No recoverable files found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead>
              <tr>
                <th>File</th>
                <th>Added by</th>
                <th>Deleted by</th>
                <th>Deleted at</th>
                <th>Time remaining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>
                    <a href={file.url} target="_blank" rel="noreferrer">
                      {file.name}
                    </a>
                  </td>
                  <td>{file.addedBy?.email ?? "Unknown"}</td>
                  <td>{file.deletedBy?.email ?? "Unknown"}</td>
                  <td>
                    {file.deletedAt?.toLocaleString() ?? "Unknown"}
                  </td>
                  <td>
                    {file.deletedAt
                      ? formatRemaining(file.deletedAt)
                      : "Unknown"}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <form action={restoreFile.bind(null, file.id)}>
                        <button className="btn btn-sm btn-success">
                          Restore
                        </button>
                      </form>

                      {process.env.ENABLE_DEV_TOOLS === "true" && (
                        <form action={purgeFile.bind(null, file.id)}>
                          <button className="btn btn-sm btn-danger">
                            Delete forever
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
