import { serialize } from 'cookie'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('token', '', { path: '/', maxAge: -1 }))
  res.status(200).json({ message: 'Logout berhasil' })
}