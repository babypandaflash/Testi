import { serialize } from "cookie";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;
  const { hash, ...fields } = data;

  const sorted = Object.keys(fields)
    .sort()
    .map((key) => `${key}=${fields[key]}`)
    .join("\n");

  const secret = crypto
    .createHash("sha256")
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest();

  const hmac = crypto.createHmac("sha256", secret).update(sorted).digest("hex");

  if (hmac !== hash) {
    return res.status(403).json({ error: "Invalid Telegram signature" });
  }

  // Save to cookie
  const userCookie = serialize("telegram_user", data.username || data.id, {
    path: "/",
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", userCookie);
  res.status(200).json({ success: true });
}
