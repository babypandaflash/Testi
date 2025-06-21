import { serialize } from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;
  const redirect_uri = "https://your-vercel-app.vercel.app/api/discord/callback";

  const params = new URLSearchParams();
  params.append("client_id", process.env.DISCORD_CLIENT_ID);
  params.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  const tokenData = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
    },
  });
  const user = await userRes.json();

  const cookie = serialize("discord_token", tokenData.access_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  const userCookie = serialize("discord_user", user.username, {
    path: "/",
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", [cookie, userCookie]);
  res.redirect("/index.html");
}
