// pages/dashboard.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user)
        else router.push('/login')
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout')
    router.push('/login')
  }

  return (
    <Layout>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 text-white p-4">
          <h2 className="text-lg font-semibold mb-6">📋 Menu</h2>
          <ul className="space-y-2">
            <li>🏠 Dashboard</li>
            <li>👤 Profil</li>
            <li>⚙️ Pengaturan</li>
          </ul>
        </aside>

        {/* Konten Utama */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Halo, {user?.email}</h1>

          {/* Grid Layout untuk Konten */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow p-4">📦 Card 1</div>
            <div className="bg-white rounded-xl shadow p-4">📦 Card 2</div>
            <div className="bg-white rounded-xl shadow p-4">📦 Card 3</div>
            <div className="bg-white rounded-xl shadow p-4">📦 Card 4</div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </main>
      </div>
    </Layout>
  )
}
