import { serialize } from 'cookie';

export default function handler(req, res) {
  const tokenCookie = serialize("youtube_token", "", {
    path: "/",
    maxAge: 0,
  });

  const userCookie = serialize("youtube_user", "", {
    path: "/",
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", [tokenCookie, userCookie]);
  res.status(200).json({ success: true });
}
