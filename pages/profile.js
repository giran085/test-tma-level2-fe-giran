import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [mockProducts, setMockProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    fetch('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.email) setUser(data)
        else router.push('/login')
      })

    fetch('/api/products')
      .then(res => res.json())
      .then((data) => {
        console.log('Data produk:', data)
        setProducts(Array.isArray(data) ? data : [])
      })

    fetch('/api/products-mock')
      .then(res => res.json())
      .then((data) => {
        console.log('Mock data:', data)
        setMockProducts(Array.isArray(data) ? data : [])
      })
  }, [])

 const renderTable = (title, items) => (
  <>
    <h2 className="text-xl font-semibold mt-6 mb-2 text-white">{title}</h2>
    <table className="w-full bg-gray-800 shadow rounded overflow-hidden text-white">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Product Name</th>
          <th className="p-2 text-left">Product Brand</th>
          <th className="p-2 text-left">Product Owner</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((p) => (
            <tr key={p.id} className="border-t border-gray-600">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.product_name}</td>
              <td className="p-2">{p.product_brand}</td>
              <td className="p-2">{p.owner_name}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-4 text-center text-gray-400">Tidak ada data</td>
          </tr>
        )}
      </tbody>
    </table>
  </>
)


  return (
    <Layout>
      <div className="p-8 bg-gray-900 min-h-screen">
        <h1 className="text-2xl mb-4">Profil Pengguna</h1>
        {user ? (
          <div className="bg-gray rounded-xl shadow p-4 mb-6">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nama:</strong> {user.name}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>Memuat data profil...</p>
        )}

        {renderTable('Data dari Database (Prisma)', products)}
        {renderTable('Data dari Mock API', mockProducts)}
      </div>
    </Layout>
  )
}
