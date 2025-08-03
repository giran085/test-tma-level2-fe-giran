import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Test LEVEL dua FE Giran</h1>
        <Link href="/login" className="bg-blue-500 text-white px-6 py-2 rounded">Login</Link>
      </div>
    </Layout>
  )
}