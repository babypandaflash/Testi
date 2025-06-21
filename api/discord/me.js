
export default function handler(req, res) {
  try {
    const cookie = req.headers.cookie || "";
    const match = cookie.match(/discord_user=([^;]+)/);
    if (!match) return res.status(401).json({ error: "Not logged in" });

    const user = JSON.parse(decodeURIComponent(match[1]));
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "Failed to parse user" });
  }
}
