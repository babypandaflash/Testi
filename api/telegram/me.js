export default function handler(req, res) {
  const { telegram_user } = req.cookies;

  if (!telegram_user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.status(200).json({ username: telegram_user });
}
