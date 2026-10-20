"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { registerFile } from "@/lib/fileActions";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    try {
      setStatus("Uploading...");
      const blob = await upload(`dev-uploads/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/files/upload",
      });
      await registerFile({
        name: file.name,
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: file.size,
      });
      setStatus("Done!");
    } catch (err) {
      setStatus(`Failed: ${(err as Error).message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="file" ref={inputRef} className="form-control mb-2" required />
      <button className="btn btn-primary">Upload</button> <span>{status}</span>
    </form>
  );
}
