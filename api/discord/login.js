export default async function handler(req, res) {
  const redirect_uri = encodeURIComponent("https://your-vercel-app.vercel.app/api/discord/callback");
  const client_id = process.env.DISCORD_CLIENT_ID;
  const scope = encodeURIComponent("identify");

  return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`);
}
