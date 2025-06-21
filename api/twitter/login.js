import crypto from "crypto";

export default function handler(req, res) {
  const state = crypto.randomUUID();
  const codeVerifier = crypto.randomBytes(32).toString("hex");
  const codeChallenge = codeVerifier; // Simple PKCE for now

  const client_id = process.env.TWITTER_CLIENT_ID;
  const redirect_uri = encodeURIComponent("https://your-vercel-app.vercel.app/api/twitter/callback");

  res.setHeader(
    "Set-Cookie",
    `twitter_code_verifier=${codeVerifier}; Path=/; HttpOnly; Secure; Max-Age=300`
  );

  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=tweet.read%20users.read%20offline.access&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  res.redirect(authUrl);
}
