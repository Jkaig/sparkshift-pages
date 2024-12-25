import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ErrorBoundary from '../components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spark Shift - Connect. Organize. Electrify.',
  description: 'The ultimate app for electrical apprentices and journeymen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <noscript>
          <style>{`
            .js-only { display: none !important; }
            .no-js { display: block !important; }
          `}</style>
        </noscript>
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="js-only">{children}</div>
          <div className="no-js" style={{ display: 'none' }}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] to-[#001233] text-white p-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Spark Shift</h1>
                <p>Please enable JavaScript to view this website.</p>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}

