import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import type { Faq } from "@/types/FaqTypes";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const faqs = await db
      .collection("faqs")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Failed to fetch FAQs", error);
    return NextResponse.json({ faqs: [] });
  }
}

export async function PUT(request: Request) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      faqs?: { question?: string; answer?: string }[];
    };
    const items = body.faqs ?? [];

    if (items.length !== 6) {
      return NextResponse.json(
        { message: "Exactly 6 FAQs are required." },
        { status: 400 },
      );
    }

    const faqs: Faq[] = items.map((f, i) => ({
      order: i,
      side: i < 3 ? "left" : "right",
      question: f.question?.trim() ?? "",
      answer: f.answer?.trim() ?? "",
    }));

    if (faqs.some((f) => !f.question || !f.answer)) {
      return NextResponse.json(
        { message: "All questions and answers are required." },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("faqs");
    await collection.deleteMany({});
    await collection.insertMany(faqs);

    return NextResponse.json({ message: "FAQs saved." });
  } catch (error) {
    console.error("Failed to save FAQs", error);
    return NextResponse.json(
      { message: "Could not save FAQs." },
      { status: 500 },
    );
  }
}
