export default function handler(req, res) {
  const { discord_user } = req.cookies;

  if (!discord_user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.status(200).json({ username: discord_user });
}
