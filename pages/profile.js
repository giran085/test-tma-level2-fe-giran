import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    // Fetch user profile
    fetch('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.email) setUser(data)
        else router.push('/login')
      })
      .catch(() => router.push('/login'))

    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoadingProducts(false)
      })
      .catch(() => setLoadingProducts(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (!user) {
    return <p className="text-white text-center mt-20">Loading user...</p>
  }

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Profil Pengguna Test Level 2 FE giran (klikace123@gmail.com)</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      </div>

      <p className="text-xl">Email: {user.email}</p>
      <p className="text-xl">Nama: {user.name}</p>
      <p className="text-xl">Role: {user.role}</p>

      <h2 className="text-3xl mt-10 mb-4 font-semibold">Produk</h2>
      <table className="w-full text-left text-lg border-collapse border border-white">
        <thead>
          <tr className="bg-gray-900">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {loadingProducts ? (
            <tr>
              <td colSpan="4" className="text-center border p-2">
                Loading produk...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center border p-2">
                Tidak ada produk ditemukan.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-800">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.brand}</td>
                <td className="border p-2">{p.owner}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
