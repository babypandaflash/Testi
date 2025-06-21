export default async function handler(req, res) {
  const redirect_uri = encodeURIComponent("https://your-vercel-app.vercel.app/api/youtube/callback");
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent("https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email");

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`
  );
}
