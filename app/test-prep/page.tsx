import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

export default function TestPrepPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <Badge variant="outline" className="mb-4">Featured</Badge>
        <h1 className="text-4xl font-bold">Electrician Exam Prep</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master your state's electrician exam with our comprehensive prep materials
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Daily Practice</CardTitle>
            <CardDescription>
              Quick 5-15 minute quizzes to keep your knowledge sharp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                State-specific questions
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Progress tracking
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Detailed explanations
              </li>
            </ul>
            <Button asChild>
              <Link href="/pricing">Start Practicing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Resources</CardTitle>
            <CardDescription>
              Comprehensive materials to build a strong foundation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Code references
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Study guides
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Practice problems
              </li>
            </ul>
            <Button variant="outline" asChild>
              <Link href="/resources">View Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground">
          Join thousands of successful electricians who prepared with our materials.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/pricing">Start Free Trial</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resources">Browse Resources</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
