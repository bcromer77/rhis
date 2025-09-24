import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

// Path to leads.json inside project root (outside .next build)
const leadsFile = path.join(process.cwd(), "leads.json");

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const entry = {
    timestamp: new Date().toISOString(),
    name,
    email,
    message,
  };

  try {
    // --- 1) Send Email ---
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bazil.cromer@ripplexn.com",
      subject: `New Contact Lead from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // --- 2) Log to Console (for server logs) ---
    console.log("📩 New lead captured:", entry);

    // --- 3) Append to leads.json (backup) ---
    try {
      let existing: any[] = [];
      if (fs.existsSync(leadsFile)) {
        const fileData = fs.readFileSync(leadsFile, "utf-8");
        existing = JSON.parse(fileData || "[]");
      }
      existing.push(entry);
      fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), "utf-8");
    } catch (fileError) {
      console.error("⚠️ Failed to write lead backup file:", fileError);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("❌ Error sending contact email:", error);
    return NextResponse.json(
      { error: error.message || "Email send failed" },
      { status: 500 }
    );
  }
}
