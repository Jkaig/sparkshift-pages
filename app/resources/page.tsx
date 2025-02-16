import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

const resources = [
  {
    title: "Study Guides",
    description: "Comprehensive guides covering all exam topics",
    features: [
      "State-specific content",
      "Practice problems",
      "Code references",
      "Study tips"
    ],
    free: true
  },
  {
    title: "Practice Tests",
    description: "Full-length practice exams with detailed explanations",
    features: [
      "Timed tests",
      "Score tracking",
      "Answer explanations",
      "Performance analytics"
    ]
  },
  {
    title: "Code References",
    description: "Quick access to relevant code sections",
    features: [
      "NEC references",
      "State amendments",
      "Code updates",
      "Search functionality"
    ]
  },
  {
    title: "Video Lessons",
    description: "In-depth video explanations of key concepts",
    features: [
      "Expert instructors",
      "Visual demonstrations",
      "Step-by-step solutions",
      "Mobile-friendly"
    ]
  }
]

export default function ResourcesPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <Badge variant="outline" className="mb-4">Resources</Badge>
        <h1 className="text-4xl font-bold">Study Materials</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to prepare for your electrician exam
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </div>
                {resource.free && <Badge>Free</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {resource.features.map((feature) => (
                  <li key={feature} className="flex items-center">
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={resource.free ? "outline" : "default"} asChild>
                <Link href={resource.free ? "/resources/free" : "/pricing"}>
                  {resource.free ? "Access Free Content" : "Subscribe to Access"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Need More Help?</h2>
        <p className="text-muted-foreground">
          Our team is here to support your exam preparation journey
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </section>
    </div>
  )
}
