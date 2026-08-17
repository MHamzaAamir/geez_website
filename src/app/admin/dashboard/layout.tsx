"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PublishButton from "@/components/admin/PublishButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) router.push("/admin");
      } catch {
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }
    checkSession();

    document.documentElement.style.scrollbarGutter = "stable";
    return () => {
      document.documentElement.style.scrollbarGutter = "";
    };
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-3">
            <PublishButton />
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-neutral-700 px-4 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
