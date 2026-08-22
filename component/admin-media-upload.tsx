"use client";

import { FormEvent, useState } from "react";
import { UploadCloud } from "lucide-react";

export default function AdminMediaUpload() {
  const [uploadedPath, setUploadedPath] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setMessage("");
    setUploadedPath("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        error?: string;
        path?: string;
      };

      if (!response.ok || !result.path) {
        throw new Error(result.error ?? "Upload failed.");
      }

      event.currentTarget.reset();
      setUploadedPath(result.path);
      setMessage("Uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="mt-8 rounded-[24px] border border-[#E1D4C8] bg-white p-6 shadow-[0_18px_52px_rgba(64,45,30,0.08)] dark:border-[#D4A72C]/16 dark:bg-[#21130C] sm:p-8">
      <div className="flex items-center gap-3">
        <UploadCloud className="h-6 w-6 text-[#C18A4A]" />
        <h2 className="font-serif text-3xl font-semibold">Media Upload</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-semibold">
          Image or video
          <input
            name="file"
            type="file"
            required
            accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
            className="rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 py-3 text-sm font-normal dark:border-[#D4A72C]/16 dark:bg-[#160C07]"
          />
        </label>
        <button
          disabled={uploading}
          className="self-end rounded-full bg-[#315C45] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-sm text-[#75695F] dark:text-[#CDBB9E]">
          {message}
        </p>
      ) : null}
      {uploadedPath ? (
        <input
          readOnly
          value={uploadedPath}
          className="mt-3 h-11 w-full rounded-2xl border border-[#E1D4C8] bg-[#FFFDF7] px-4 text-sm text-[#315C45] outline-none dark:border-[#D4A72C]/16 dark:bg-[#160C07] dark:text-[#D4A72C]"
        />
      ) : null}
    </section>
  );
}
