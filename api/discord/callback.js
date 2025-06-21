
import { serialize } from "cookie";

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${process.env.BASE_URL}/api/discord/callback`,
    }),
  });

  const tokenData = await tokenRes.json();
  const access_token = tokenData.access_token;

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const user = await userRes.json();

  const cookie = serialize("discord_user", JSON.stringify(user), {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", cookie);
  res.redirect("/index.html");
}
