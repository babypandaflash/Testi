export default function handler(req, res) {
  const { youtube_user } = req.cookies;

  if (!youtube_user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.status(200).json({ email: youtube_user });
}
