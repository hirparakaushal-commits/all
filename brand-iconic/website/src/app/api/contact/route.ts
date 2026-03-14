import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  revenue?: string;
  services?: string[];
  message: string;
}

function validatePayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (typeof d.name !== "string" || d.name.trim().length === 0) return false;
  if (typeof d.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return false;
  if (typeof d.company !== "string" || d.company.trim().length === 0) return false;
  if (typeof d.message !== "string" || d.message.trim().length < 20) return false;
  return true;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const data = await request.json();

    if (!validatePayload(data)) {
      return NextResponse.json(
        { success: false, error: "Invalid form data. Please fill all required fields." },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is configured, send email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Brand Iconic <notifications@brandikonic.com>",
        to: ["hello@brandikonic.com"],
        subject: `New Lead: ${data.name} from ${data.company}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Revenue Range:</strong> ${data.revenue || "Not specified"}</p>
          <p><strong>Services:</strong> ${data.services?.join(", ") || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });
    } else {
      // Log to console in development
      console.log("New contact form submission:", data);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
