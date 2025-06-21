export default function handler(req, res) {
  const { twitter_user } = req.cookies;

  if (!twitter_user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  return res.status(200).json({ username: twitter_user });
}
