import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Link } from 'expo-router';

const resources = [
  {
    title: "Apprentice Evaluation",
    description: "Comprehensive guide for evaluating apprentice performance and progress tracking.",
    category: "Training",
  },
  {
    title: "Journeyman Review",
    description: "Detailed materials to help prepare for journeyman certification exams.",
    category: "Certification",
  },
  {
    title: "Safety Guidelines",
    description: "Up-to-date electrical safety protocols and best practices.",
    category: "Safety",
  },
  {
    title: "Code Updates",
    description: "Latest electrical code changes and compliance requirements.",
    category: "Compliance",
  },
  {
    title: "Business Tools",
    description: "Templates and tools for managing your electrical business effectively.",
    category: "Business",
  },
  {
    title: "Technical Library",
    description: "Extensive collection of technical documentation and guides.",
    category: "Technical",
  },
]

export default function ResourcesPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Access our comprehensive collection of electrical industry resources
        </p>
      </section>

      <section className="flex justify-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search resources" />
          <Button type="submit">Search</Button>
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{resource.title}</CardTitle>
                  <Badge>{resource.category}</Badge>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Access Resource</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Premium Resources</CardTitle>
            <CardDescription>
              Unlock access to our complete library of premium resources, including advanced training materials and
              exclusive content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/pricing">Upgrade to Premium</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
