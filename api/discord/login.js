
export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/discord/callback`,
    response_type: "code",
    scope: "identify email"
  });
  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
}
