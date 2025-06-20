import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_IDS: Record<string, string | undefined> = {
    contact: process.env.CONTACT_GOOGLE_SHEET_ID,
    serve: process.env.SERVE_GOOGLE_SHEET_ID,
    resources: process.env.RESOURCES_GOOGLE_SHEET_ID,
    ftvisitor: process.env.FTVISITOR_GOOGLE_SHEET_ID,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const targetSheetId = SHEET_IDS[body.spreadsheet];
    console.log("Target Sheet ID:", targetSheetId );
    
    if (!targetSheetId) {
      return NextResponse.json({ error: "Invalid spreadsheet key" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets("v4");

    const response = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: targetSheetId,
      range: "A1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name,body.lastname, body.email, body.phone, body.message, body.address, body.citystatezip, body.visitcount,body.subject, body.age,]],
      },
    });

    return NextResponse.json({ data: response.data }, { status: 201 });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}