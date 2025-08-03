import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('john@mail.com')
  const [password, setPassword] = useState('changeme')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.access_token) {
      localStorage.setItem('token', data.access_token)
      router.push('/profile')
    } else {
      setError('Login gagal')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Selamat Datang di Test TMA Level 2 FE Giran</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input className="p-2 bg-gray-800 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-white text-black p-2 font-bold rounded">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
