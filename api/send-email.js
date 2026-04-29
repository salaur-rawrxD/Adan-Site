/* eslint-disable @typescript-eslint/no-require-imports */
const sgMail = require("@sendgrid/mail");

const senderEmail = "adan@withadan.com";
const recipientEmail = "adan@withadan.com";

function getValue(value) {
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

async function parseBody(req) {
  const contentType = req.headers["content-type"] || "";
  const rawBody = await readRawBody(req);

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  return Object.fromEntries(new URLSearchParams(rawBody).entries());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatHtmlEmail({ name, email, business, need, slowdown, context }) {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Business / Organization", business || "Not provided"],
    ["Need", need],
    ["Situation", slowdown || "Not provided"],
    ["Additional Context", context || "Not provided"],
  ];

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #0A0D14; line-height: 1.6;">
      <h1 style="font-size: 24px; margin: 0 0 8px;">New Conversation Request</h1>
      <p style="margin: 0 0 24px; color: #64748B;">Submitted from withadan.com</p>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width: 190px; padding: 12px; border: 1px solid #E2E8F0; background: #F8FAFC; font-weight: 700; vertical-align: top;">
                  ${escapeHtml(label)}
                </td>
                <td style="padding: 12px; border: 1px solid #E2E8F0; white-space: pre-wrap;">
                  ${escapeHtml(value)}
                </td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function formatTextEmail({ name, email, business, need, slowdown, context }) {
  return [
    "New conversation request from withadan.com",
    "",
    "---",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${business || "Not provided"}`,
    `Need: ${need}`,
    `Situation: ${slowdown || "Not provided"}`,
    `Context: ${context || "Not provided"}`,
    "---",
  ].join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = await parseBody(req);

    if (getValue(body.website)) {
      return res.status(200).json({ success: true, message: "Submitted" });
    }

    const fields = {
      name: getValue(body.name),
      email: getValue(body.email),
      business: getValue(body.business),
      need: getValue(body.need),
      slowdown: getValue(body.slowdown || body.message),
      context: getValue(body.context || body.additional_context),
    };

    if (!fields.name || !fields.email || !fields.need) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and need are required.",
      });
    }

    if (!isValidEmail(fields.email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }

    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ success: false, message: "Email service is not configured" });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: recipientEmail,
      from: senderEmail,
      replyTo: fields.email,
      subject: `New Conversation Request from ${fields.name}`,
      text: formatTextEmail(fields),
      html: formatHtmlEmail(fields),
    });

    return res.status(200).json({ success: true, message: "Thanks. Your message was sent." });
  } catch (error) {
    console.error("Contact email failed", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again or email adan@withadan.com",
    });
  }
};
