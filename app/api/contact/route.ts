import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const businessSchema = z.object({
  type: z.literal("business"),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(160),
  phone: z.string().trim().max(40).optional().default(""),
  website: z.string().trim().max(250).optional().default(""),
  service: z.enum(["Creator Discovery", "Brand Partnerships", "Campaign Management", "Something else"]),
  budget: z.enum(["", "Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"]).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  websiteAddress: z.string().max(0).optional().default(""),
});

const creatorSchema = z.object({
  type: z.literal("creator"),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  instagram: z.string().trim().min(1).max(200),
  niche: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  websiteAddress: z.string().max(0).optional().default(""),
});

const submissionSchema = z.discriminatedUnion("type", [businessSchema, creatorSchema]);
const recentSubmissions = new Map<string, number[]>();
const RATE_LIMIT = 4;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string, now: number): boolean {
  const attempts = (recentSubmissions.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (attempts.length >= RATE_LIMIT) {
    recentSubmissions.set(ip, attempts);
    return true;
  }
  attempts.push(now);
  recentSubmissions.set(ip, attempts);
  return false;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function emailRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:12px 0;color:#6b7896;font-size:13px;border-bottom:1px solid #e8edf5;width:150px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:12px 0;color:#031344;font-size:14px;border-bottom:1px solid #e8edf5;vertical-align:top">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ message: "Your submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid form." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the required fields and try again." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.websiteAddress) {
    return NextResponse.json({ message: "Your enquiry could not be accepted." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";
  if (isRateLimited(ip, Date.now())) {
    return NextResponse.json(
      { message: "Too many enquiries from your connection. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error("Contact email is not configured. Set RESEND_API_KEY, CONTACT_EMAIL, and EMAIL_FROM.");
    return NextResponse.json(
      { message: "Our enquiry service is temporarily unavailable. Please email hello.kreatty@gmail.com directly." },
      { status: 503 },
    );
  }

  const isCreator = data.type === "creator";
  const rows = isCreator
    ? [
        emailRow("Name", data.name),
        emailRow("Email", data.email),
        emailRow("Instagram / social", data.instagram),
        emailRow("Niche", data.niche),
      ].join("")
    : [
        emailRow("Name", data.name),
        emailRow("Email", data.email),
        emailRow("Company / brand", data.company),
        emailRow("Phone", data.phone),
        emailRow("Instagram / website", data.website),
        emailRow("Service", data.service),
        emailRow("Estimated budget", data.budget),
      ].join("");

  const subject = isCreator
    ? `Creator enquiry from ${data.name}`
    : `New brand enquiry — ${data.company}`;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html: `<div style="background:#f3f7fc;padding:36px 16px;font-family:Arial,Helvetica,sans-serif"><div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden"><div style="padding:28px 32px;background:#031344"><div style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-.5px">kreatty<span style="color:#32D9F5">.</span></div><div style="margin-top:8px;color:#a8c9ef;font-size:12px;letter-spacing:1.6px;text-transform:uppercase">${isCreator ? "Creator network enquiry" : "New business enquiry"}</div></div><div style="padding:30px 32px"><h1 style="margin:0 0 22px;color:#031344;font-size:21px">A new ${isCreator ? "creator" : "brand"} enquiry</h1><table style="width:100%;border-collapse:collapse">${rows}</table><div style="margin-top:26px"><div style="margin-bottom:10px;color:#6b7896;font-size:13px">Message</div><div style="padding:16px;background:#f4f9fc;border-radius:10px;color:#031344;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</div></div></div><div style="padding:18px 32px;border-top:1px solid #e8edf5;color:#8290a8;font-size:12px">Reply directly to this email to get back to ${escapeHtml(data.name)}.</div></div></div>`,
      text: [
        `New ${isCreator ? "creator" : "business"} enquiry`,
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        isCreator ? `Instagram / social: ${data.instagram}` : `Company / brand: ${data.company}`,
        isCreator ? `Niche: ${data.niche}` : `Service: ${data.service}`,
        !isCreator && data.phone ? `Phone: ${data.phone}` : "",
        !isCreator && data.website ? `Instagram / website: ${data.website}` : "",
        !isCreator && data.budget ? `Estimated budget: ${data.budget}` : "",
        "",
        "Message:",
        data.message,
      ].filter(Boolean).join("\n"),
    });

    if (error) {
      console.error("Resend rejected an enquiry email:", error.name, error.message);
      return NextResponse.json(
        { message: "We couldn't deliver your enquiry just now. Please try again or email hello.kreatty@gmail.com." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Resend enquiry delivery failed:", error);
    return NextResponse.json(
      { message: "We couldn't deliver your enquiry just now. Please try again or email hello.kreatty@gmail.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Enquiry sent." }, { status: 200 });
}
