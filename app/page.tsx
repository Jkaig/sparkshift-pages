import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'expo-router';
import { routes } from '../lib/routes';

export default function Home() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">SparkShift</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering Electrical Professionals with Smart Solutions
        </p>
        <div className="flex justify-center gap-4">
          <Link href={routes.screens.pricing} asChild>
            <Button>View Pricing</Button>
          </Link>
          <Link href={routes.screens.contact} asChild>
            <Button variant="outline">Contact Sales</Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Smart Scheduling", "Resource Library", "Progress Tracking"].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {feature === "Smart Scheduling"
                    ? "Efficiently manage your appointments and work schedule"
                    : feature === "Resource Library"
                      ? "Access a comprehensive collection of electrical resources"
                      : "Monitor your professional development and certifications"}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">Ready to transform your electrical business?</h2>
        <Link href={routes.auth.signup} asChild>
          <Button size="lg">Get Started</Button>
        </Link>
      </section>
    </div>
  );
}
