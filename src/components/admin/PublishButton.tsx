"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Rocket } from "lucide-react";

export default function PublishButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePublish() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/publish", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.message || "Failed to publish.");
        return;
      }

      setMessage("Deployment triggered. The site is rebuilding.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-4 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
      >
        <Rocket className="h-4 w-4" />
        Publish Changes
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => !loading && setOpen(false)}
          >
            <div
              className="w-full max-w-sm rounded-lg border border-neutral-800 bg-neutral-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-white">
                Publish changes?
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                This will trigger a rebuild and deploy the latest version of the
                site.
              </p>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Publishing..." : "Confirm"}
                </button>
              </div>

              {message && (
                <p className="mt-4 text-sm text-neutral-400">{message}</p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
