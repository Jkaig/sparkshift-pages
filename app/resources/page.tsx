import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Link } from 'expo-router';
import { routes } from '../../lib/routes';

const resources = [
  {
    title: "Free Practice Questions",
    description: "Sample questions from our state-specific exam prep materials.",
    category: "Practice",
    free: true,
  },
  {
    title: "Study Schedule Template",
    description: "Customizable study schedule to help you prepare effectively.",
    category: "Planning",
    free: true,
  },
  {
    title: "NEC Code Overview",
    description: "Basic overview of the National Electrical Code and key concepts.",
    category: "Code",
    free: true,
  },
  {
    title: "Math Formula Sheet",
    description: "Essential formulas for electrical calculations.",
    category: "Calculations",
    free: true,
  },
  {
    title: "State Requirements Guide",
    description: "Comprehensive guide to electrician licensing requirements by state.",
    category: "Licensing",
    free: true,
  },
  {
    title: "Test-Taking Strategies",
    description: "Tips and techniques for mastering the electrician exam.",
    category: "Strategy",
    free: true,
  },
]

export default function ResourcesPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Free Exam Prep Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start preparing for your electrician exam with our free resources
        </p>
      </section>

      <section className="flex justify-center">
        <div className="w-full max-w-xl">
          <Input
            type="search"
            placeholder="Search resources..."
            className="w-full"
          />
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription className="mt-2">{resource.description}</CardDescription>
                  </div>
                  {resource.free && (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-4">{resource.category}</Badge>
                <Button className="w-full">Access Resource</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center space-y-6 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold">Need More Practice?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get access to our complete library of state-specific practice questions, full-length practice tests, and detailed explanations.
        </p>
        <Button asChild>
          <Link href={routes.pricing}>View Pricing Plans</Link>
        </Button>
      </section>
    </div>
  )
}
