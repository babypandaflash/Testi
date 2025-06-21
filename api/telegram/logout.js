import { serialize } from "cookie";

export default function handler(req, res) {
  const userCookie = serialize("telegram_user", "", {
    path: "/",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", userCookie);
  res.status(200).json({ success: true });
}
