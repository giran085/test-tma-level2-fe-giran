import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ user: null })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ user: decoded })
  } catch {
    res.status(401).json({ user: null })
  }
}