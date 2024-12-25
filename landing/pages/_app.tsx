import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleOffline = () => {
      console.log('App is offline')
      // You can add more offline handling logic here
    }

    const handleOnline = () => {
      console.log('App is back online')
      // You can add more online handling logic here
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

