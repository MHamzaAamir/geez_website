import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("admin_token="));

  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const token = cookie.split("=")[1];
  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: { username: payload.username },
  });
}
