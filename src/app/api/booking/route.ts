import { NextResponse } from "next/server";
import { google } from "googleapis";

type BookingPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function appendBookingRow(name: string, email: string, message: string) {
  const clientEmail = getRequiredEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = getRequiredEnv("GOOGLE_SHEETS_PRIVATE_KEY").replace(
    /\\n/g,
    "\n",
  );
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Sheet1";

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:C`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, message]],
    },
  });
}

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

    await appendBookingRow(name, email, message);

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
