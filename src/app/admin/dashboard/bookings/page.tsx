"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
} from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface BookingsResponse {
  bookings: Booking[];
  total: number;
  page: number;
  totalPages: number;
}

function timeAgo(dateStr: string): string {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const LIMIT = 8;

export default function BookingsPage() {
  const router = useRouter();
  const [data, setData] = useState<BookingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchBookings = useCallback(
    async (p: number, q: string, initial: boolean) => {
      if (initial) setLoading(true);
      else setFetching(true);
      try {
        const params = new URLSearchParams({
          page: String(p),
          limit: String(LIMIT),
        });
        if (q.trim()) params.set("search", q.trim());

        const res = await fetch(`/api/booking?${params}`);
        if (!res.ok) {
          if (res.status === 401) router.push("/admin");
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        router.push("/admin");
      } finally {
        setLoading(false);
        setFetching(false);
      }
    },
    [router],
  );

  const firstFetch = useRef(true);

  useEffect(() => {
    fetchBookings(page, debouncedSearch, firstFetch.current);
    firstFetch.current = false;
  }, [page, debouncedSearch, fetchBookings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const bookings = data?.bookings ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;

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
        <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
        <p className="text-sm text-neutral-500">
          {total} booking{total !== 1 && "s"} received
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          {fetching ? (
            <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
          ) : (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          )}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-xl border border-neutral-800 py-20 text-center">
          <p className="text-sm text-neutral-500">
            {debouncedSearch
              ? "No bookings match your search."
              : "No bookings yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-sm font-semibold text-neutral-300 uppercase">
                    {booking.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">
                          {booking.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-500">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span className="truncate">{booking.email}</span>
                        </div>
                      </div>
                      <span className="shrink-0 pt-0.5 text-xs text-neutral-600">
                        {timeAgo(booking.createdAt)}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-400">
                      {booking.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
                    p === page
                      ? "border border-white text-white"
                      : "border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
