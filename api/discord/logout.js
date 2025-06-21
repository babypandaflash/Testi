
import { serialize } from "cookie";

export default function handler(req, res) {
  const cookie = serialize("discord_user", "", {
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).send("Logged out");
}
