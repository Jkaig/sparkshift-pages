'use client'

import React, { ErrorInfo, ReactNode } from 'react'
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  isOffline: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, isOffline: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true, isOffline: !navigator.onLine }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }

  handleOnline = () => {
    this.setState({ isOffline: false, hasError: false })
  }

  handleOffline = () => {
    this.setState({ isOffline: true })
  }

  render() {
    if (this.state.hasError || this.state.isOffline) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] to-[#001233] text-white p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {this.state.isOffline ? "You are offline" : "Something went wrong"}
            </h2>
            <p className="mb-4">
              {this.state.isOffline 
                ? "Please check your internet connection and try again." 
                : "We apologize for the inconvenience. Please try refreshing the page."}
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

