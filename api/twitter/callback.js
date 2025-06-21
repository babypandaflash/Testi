import { serialize } from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;
  const code_verifier = req.cookies.twitter_code_verifier;
  const redirect_uri = "https://your-vercel-app.vercel.app/api/twitter/callback";

  const body = {
    grant_type: "authorization_code",
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri,
    code,
    code_verifier
  };

  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(body)
  });

  const tokenData = await tokenRes.json();

  const userRes = await fetch("https://api.twitter.com/2/users/me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userRes.json();

  const tokenCookie = serialize("twitter_token", tokenData.access_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  const userCookie = serialize("twitter_user", user.data.username, {
    path: "/",
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", [tokenCookie, userCookie]);
  res.redirect("/index.html");
}
