import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('john@mail.com')
  const [password, setPassword] = useState('changeme')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (data.access_token) {
      localStorage.setItem('token', data.access_token)
      router.push('/profile')
    } else {
      alert('Login gagal')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">Login dengan JWT</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-80">
        <input className="border px-4 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border px-4 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">Login</button>
      </form>
    </div>
  )
}