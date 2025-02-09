import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const plans = [
  {
    name: "Basic",
    price: "$29.99",
    period: "/month",
    features: ["Smart Scheduling", "Resource Library", "Basic Support", "Single User"],
  },
  {
    name: "Pro",
    price: "$49.99",
    period: "/month",
    features: ["All Basic Features", "Advanced Analytics", "Priority Support", "Up to 5 Users", "Custom Reports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "/month",
    features: [
      "All Pro Features",
      "Dedicated Support",
      "Unlimited Users",
      "API Access",
      "Custom Integration",
      "Training Sessions",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your electrical business needs
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && <Badge>Most Popular</Badge>}
                </div>
                <CardDescription>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button className="w-full">Select Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I change plans later?</AccordionTrigger>
            <AccordionContent>
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>Yes, all plans come with a 14-day free trial. No credit card required.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}

