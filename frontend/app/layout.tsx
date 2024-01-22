import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './_context/AuthContext'
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Billing Software - DigiLabs',
  description: 'Created By DigiLabs.Co',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
      {/* className={inter.className} */}
        <div>
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
