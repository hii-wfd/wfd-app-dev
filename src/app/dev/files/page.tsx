import { notFound } from "next/navigation";
import FileUploader from "@/components/FileUploader";
import { listActiveFiles, listDeletedFiles } from "@/lib/fileQueries";
import { softDeleteFile, restoreFile, purgeFile } from "@/lib/fileActions";

export const dynamic = "force-dynamic"; // always read live data, never prerender

export default async function DevFilesPage() {
  if (process.env.ENABLE_DEV_TOOLS !== "true") notFound();

  const [active, deleted] = await Promise.all([listActiveFiles(), listDeletedFiles()]);

  return (
    <main className="container py-4">
      <br></br>
      <br></br>
      <h1>Dev: Stored Files</h1>
      <FileUploader />

      <h2>Active ({active.length})</h2>
      <ul className="list-group mb-4">
        {active.map((f) => (
          <li key={f.id} className="list-group-item d-flex justify-content-between">
            <a href={f.url} target="_blank">{f.name}</a>
            <span>{(f.size / 1024).toFixed(1)} KB</span>
            <form action={softDeleteFile.bind(null, f.id)}>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </form>
          </li>
        ))}
      </ul>

      <h2>Trash ({deleted.length})</h2>
      <ul className="list-group">
        {deleted.map((f) => (
          <li key={f.id} className="list-group-item d-flex justify-content-between">
            <span>{f.name}</span>
            <form action={restoreFile.bind(null, f.id)}>
              <button className="btn btn-sm btn-outline-success">Restore</button>
            </form>
            <form action={purgeFile.bind(null, f.id)}>
              <button className="btn btn-sm btn-danger">Delete forever</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
