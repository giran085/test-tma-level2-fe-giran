import prisma from '@/lib/prisma'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (user && user.password === password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.setHeader('Set-Cookie', serialize('token', token, { path: '/', httpOnly: true }))
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'Login gagal' })
  }
}