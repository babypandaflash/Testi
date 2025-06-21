export default function handler(req, res) {
  const base = "https://discord.com/api/oauth2/authorize";

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/discord/callback`,
    response_type: "code",
    scope: "identify email", // Anda bisa tambahkan 'email' jika perlu
  });

  res.redirect(`${base}?${params.toString()}`);
}

