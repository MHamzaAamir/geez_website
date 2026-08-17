import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const deployHook = process.env.VERCEL_DEPLOY_HOOK;

  if (!deployHook) {
    return NextResponse.json(
      { message: "Deploy hook is not configured." },
      { status: 500 },
    );
  }

  const res = await fetch(deployHook, { method: "POST" });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to trigger deployment." },
      { status: res.status },
    );
  }

  return NextResponse.json({ message: "Deployment triggered." });
}
