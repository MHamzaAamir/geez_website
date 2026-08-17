import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { ObjectId } from "mongodb";

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

    const { db } = await connectToDatabase();

    await db.collection("bookings").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Booking request received successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking request failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof SyntaxError
            ? "Invalid request payload."
            : "Could not save booking request.",
      },
      { status: error instanceof SyntaxError ? 400 : 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10)),
    );
    const skip = (page - 1) * limit;
    const search = searchParams.get("search")?.trim() || "";

    const { db } = await connectToDatabase();

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { message: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [bookings, total] = await Promise.all([
      db
        .collection("bookings")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("bookings").countDocuments(filter),
    ]);

    return NextResponse.json({
      bookings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Failed to fetch bookings", error);
    return NextResponse.json(
      { message: "Could not fetch bookings." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID is required." },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Booking deleted." });
  } catch (error) {
    console.error("Failed to delete booking", error);
    return NextResponse.json(
      { message: "Could not delete booking." },
      { status: 500 },
    );
  }
}
