import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("admin_token="));

  if (!cookie) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const token = cookie.split("=")[1];
  const payload = await verifyToken(token);

  if (!payload) {
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
