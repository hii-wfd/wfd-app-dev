"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { registerFile } from "@/lib/fileActions";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [classification, setClassification] = useState<"NONE" | "PII" | "CUI">("NONE");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    try {
      setStatus("Uploading...");
      const blob = await upload(`dev-uploads/${file.name}`, file, {
        access: "private",  // public if private doesn't work
        handleUploadUrl: "/api/files/upload",
      });
      await registerFile({
        name: file.name,
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: file.size,
        classification
      });
      setStatus("Done!");
    } catch (err) {
      setStatus(`Failed: ${(err as Error).message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="file" ref={inputRef} className="form-control mb-2" required />
      <select
        className="form-select mb-2"
        value={classification}
        onChange={(e) => setClassification(e.target.value as "NONE" | "PII" | "CUI")}
      >
        <option value="NONE">Unclassified</option>
        <option value="PII">PII (test)</option>
        <option value="CUI">CUI (test)</option>
      </select>
      <button className="btn btn-primary">Upload</button> <span>{status}</span>
    </form>
  );
}
