import { verifyToken } from "@/lib/jwt";

export async function getSession(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("admin_token="));

  if (!cookie) {
    return null;
  }

  const token = cookie.slice("admin_token=".length);
  return verifyToken(token);
}
