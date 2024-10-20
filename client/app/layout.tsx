import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from './components/Navbar'  
import Head from 'next/head' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechBridge',
  description: 'A connection building platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>
        <body className={`min-h-screen bg-gray-50 flex flex-col ${inter.className}`}>
          <Navbar />  {/* Navbar will render on every page */}
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}  {/* This is where the page content will be rendered */}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
