const rateLimitWindowMs = 60 * 1000;
const submissionsByIp = new Map();

function getIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function parseCookiesOrBodyValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function readRawBody(req) {
  if (req.body) {
    if (typeof req.body === "string") return req.body;
    if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
    if (typeof req.body === "object") return new URLSearchParams(req.body).toString();
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

async function parseRequestBody(req) {
  const contentType = req.headers["content-type"] || "";
  const rawBody = await readRawBody(req);

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailText(fields) {
  const contextParts = [
    fields.message ? `Situation: ${fields.message}` : "",
    fields.additional_context ? `Additional Context: ${fields.additional_context}` : "",
    fields.context ? `Snapshot / Page Context:\n${fields.context}` : "",
    fields.source ? `Source: ${fields.source}` : "",
  ].filter(Boolean);

  return [
    "New conversation request from withadan.com",
    "",
    "---",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.business || "Not provided"}`,
    `Need: ${fields.need}`,
    contextParts.join("\n\n"),
    "---",
  ].join("\n");
}

async function sendWithResend({ apiKey, from, to, subject, replyTo, text }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      reply_to: replyTo,
      text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend failed: ${error}`);
  }
}

async function sendWithSendGrid({ apiKey, fromEmail, fromName, to, subject, replyTo, text }) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: fromEmail, name: fromName },
      reply_to: { email: replyTo },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SendGrid failed: ${error}`);
  }
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const ip = getIp(req);
  const lastSubmission = submissionsByIp.get(ip);
  const now = Date.now();
  if (lastSubmission && now - lastSubmission < rateLimitWindowMs) {
    return res.status(429).json({
      success: false,
      message: "Please wait a minute before submitting again.",
    });
  }

  try {
    const body = await parseRequestBody(req);

    if (parseCookiesOrBodyValue(body._gotcha)) {
      return res.status(200).json({ success: true, message: "Submitted" });
    }

    const fields = {
      name: parseCookiesOrBodyValue(body.name),
      email: parseCookiesOrBodyValue(body.email),
      business: parseCookiesOrBodyValue(body.business),
      need: parseCookiesOrBodyValue(body.need),
      message: parseCookiesOrBodyValue(body.message),
      additional_context: parseCookiesOrBodyValue(body.additional_context),
      context: parseCookiesOrBodyValue(body.context),
      source: parseCookiesOrBodyValue(body.source),
    };

    if (!fields.name || !fields.email || !fields.need || !fields.message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, need, and situation are required.",
      });
    }

    if (!isValidEmail(fields.email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }

    const to = process.env.CONTACT_EMAIL || "adan@withadan.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@withadan.com";
    const fromName = "Adan Aispuro";
    const subject = `New Conversation Request from ${fields.name}`;
    const text = buildEmailText(fields);

    if (process.env.RESEND_API_KEY) {
      await sendWithResend({
        apiKey: process.env.RESEND_API_KEY,
        from: `${fromName} <${fromEmail}>`,
        to,
        subject,
        replyTo: fields.email,
        text,
      });
    } else if (process.env.SENDGRID_API_KEY) {
      await sendWithSendGrid({
        apiKey: process.env.SENDGRID_API_KEY,
        fromEmail,
        fromName,
        to,
        subject,
        replyTo: fields.email,
        text,
      });
    } else {
      throw new Error("Missing RESEND_API_KEY or SENDGRID_API_KEY");
    }

    submissionsByIp.set(ip, now);
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Contact form email failed", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again or email adan@withadan.com",
    });
  }
}

module.exports = handler;
