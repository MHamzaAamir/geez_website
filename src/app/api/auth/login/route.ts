import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth";
import { signToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ username: username.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    const token = await signToken({
      sub: user._id.toString(),
      username: user.username,
    });

    const response = NextResponse.json({ message: "Login successful." });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
