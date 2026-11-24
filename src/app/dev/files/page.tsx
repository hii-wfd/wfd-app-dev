
import { notFound } from "next/navigation";
import { after } from "next/server";
import { auth } from "@/lib/auth";
import { adminProtectedPage } from "@/lib/page-protection";
import FileUploader from "@/components/FileUploader";
import {
  listActiveFiles,
  listDeletedFiles,
  formatRemaining,
} from "@/lib/fileQueries";
import { purgeExpiredFiles } from "@/lib/filePurge";
import {
  softDeleteFile,
  restoreFile,
  purgeFile,
} from "@/lib/fileActions";

export const dynamic = "force-dynamic";

export default async function DevFilesPage() {
  //if (process.env.ENABLE_DEV_TOOLS !== "true") {
  //  notFound();
  //}

  const session = await auth();

  adminProtectedPage(
    session as {
      user: {
        email: string;
        id: string;
        name: string;
        role?: string;
      };
    } | null
  );

  const [active, deleted] = await Promise.all([
    listActiveFiles(),
    listDeletedFiles(),
  ]);

  // Run expired-file cleanup after the response has been sent.
  after(async () => {
    const result = await purgeExpiredFiles();

    if (result.purged > 0 || result.failed.length > 0) {
      console.log("File cleanup result:", result);
    }
  });

  return (
    <main className="container py-4">
      <h1>Dev: Stored Files</h1>

      <FileUploader />

      <h2>Active ({active.length})</h2>

      <ul className="list-group mb-4">
        {active.map((file) => (
          <li
            key={file.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>

            <span>{(file.size / 1024).toFixed(1)} KB</span>

            <form action={softDeleteFile.bind(null, file.id)}>
              <button className="btn btn-sm btn-outline-danger">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h2>Trash ({deleted.length})</h2>

      <ul className="list-group">
        {deleted.map((file) => (
          <li
            key={file.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{file.name}</span>

            <span>
              {file.deletedAt
                ? formatRemaining(file.deletedAt)
                : "Unknown"}
            </span>

            <form action={restoreFile.bind(null, file.id)}>
              <button className="btn btn-sm btn-outline-success">
                Restore
              </button>
            </form>

            <form action={purgeFile.bind(null, file.id)}>
              <button className="btn btn-sm btn-danger">
                Delete forever
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
