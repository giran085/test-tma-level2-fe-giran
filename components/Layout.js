import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>JWT Login Test</title>
      </Head>
      <main className="min-h-screen bg-gray-100">{children}</main>
    </>
  )
}