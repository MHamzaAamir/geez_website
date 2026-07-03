import { NextResponse } from "next/server";

type BookingPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Replace this with your real integration (email service, CRM, DB, etc.)
    console.log("New booking request", {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Booking request received successfully." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }
}
