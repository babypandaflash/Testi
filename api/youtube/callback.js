import { serialize } from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;
  const redirect_uri = "https://your-vercel-app.vercel.app/api/youtube/callback";

  const params = new URLSearchParams();
  params.append("client_id", process.env.GOOGLE_CLIENT_ID);
  params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", redirect_uri);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  const tokenData = await tokenRes.json();

  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userInfoRes.json();

  const cookie = serialize("youtube_token", tokenData.access_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  const userCookie = serialize("youtube_user", user.email || user.name, {
    path: "/",
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", [cookie, userCookie]);
  res.redirect("/index.html");
}
