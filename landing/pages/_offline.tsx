import React from 'react'
import { Button } from "@/components/ui/button"

const Offline = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] to-[#001233] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You are offline</h1>
        <p className="mb-8">Please check your internet connection and try again.</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  )
}

export default Offline

