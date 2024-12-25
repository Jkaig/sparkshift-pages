import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error)
      // Prevent default error handling to avoid potential reloads
      event.preventDefault()
    }

    window.addEventListener('error', handleError)
    
    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

