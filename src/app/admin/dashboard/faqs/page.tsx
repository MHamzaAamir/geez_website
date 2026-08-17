"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const EMPTY_FAQ: FaqItem = { question: "", answer: "" };

const NUM_FAQS = 6;

export default function FaqsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FaqItem[]>(() =>
    Array.from({ length: NUM_FAQS }, () => ({ ...EMPTY_FAQ })),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs");
        if (!res.ok) {
          if (res.status === 401) router.push("/admin");
          return;
        }
        const json = await res.json();

        if (!cancelled) {
          const items = json.faqs ?? [];
          const next = Array.from({ length: NUM_FAQS }, (_, i) => ({
            question: items[i]?.question ?? "",
            answer: items[i]?.answer ?? "",
          }));
          setFaqs(next);
        }
      } catch {
        if (!cancelled) router.push("/admin");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFaqs();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateFaq(index: number, field: keyof FaqItem, value: string) {
    setFaqs((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const missing = faqs.some((f) => !f.question.trim() || !f.answer.trim());
    if (missing) {
      setMessage("All questions and answers are required.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faqs }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401) router.push("/admin");
        setMessage(data.message || "Failed to save FAQs.");
        return;
      }

      setMessage("FAQs saved successfully.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function moveFaq(index: number, direction: -1 | 1) {
    setFaqs((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">FAQs</h2>
        <p className="text-sm text-neutral-500">
          Edit the {NUM_FAQS} frequently asked questions shown on the site.
          First 3 appear on the left, last 3 on the right.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                FAQ {i + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveFaq(i, -1)}
                  disabled={i === 0}
                  className="rounded-lg border border-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveFaq(i, 1)}
                  disabled={i === faqs.length - 1}
                  className="rounded-lg border border-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move down"
                >
                  ↓
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                placeholder="Question"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
              />
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
                placeholder="Answer"
                className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="min-h-5">
          {message && (
            <p
              className={
                message.includes("required") ||
                message.includes("Failed") ||
                message.includes("wrong")
                  ? "text-sm text-red-400"
                  : "text-sm text-emerald-400"
              }
            >
              {message}
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200 disabled:opacity-50 transition-colors"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "Saving..." : "Save FAQs"}
        </button>
      </div>
    </div>
  );
}
