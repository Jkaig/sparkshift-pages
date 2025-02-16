import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link'

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  trial?: string;
  special?: boolean;
}

interface Faq {
  question: string;
  answer: string;
}

const plans: Plan[] = [
  {
    name: "Monthly Subscription",
    price: "$19.99",
    period: "/month",
    description: "Most popular choice for exam preparation",
    features: [
      "Daily 5-15 minute quizzes",
      "State-specific content",
      "Progress tracking",
      "Daily reminders",
      "Access to all practice materials",
      "Mobile app access"
    ],
    popular: true,
    cta: "Start Free Trial",
    trial: "14-day free trial, cancel anytime"
  },
  {
    name: "Sparkshift Mobile Subscriber",
    price: "$12.99",
    period: "/month",
    description: "Special pricing for our mobile app subscribers",
    features: [
      "All Monthly Subscription features",
      "Verified mobile app integration",
      "Cross-platform progress sync",
      "Priority support",
      "Early access to new features",
      "Discounted renewal rates"
    ],
    cta: "Verify & Subscribe",
    trial: "Already a mobile subscriber? Sign in to verify",
    special: true
  },
  {
    name: "One-Time Package",
    price: "$39.99",
    period: "one-time",
    description: "Perfect if you prefer no subscription",
    features: [
      "Complete set of state quizzes",
      "Lifetime access",
      "Progress tracking",
      "Mobile app access",
      "Download all materials",
      "Study at your own pace"
    ],
    cta: "Buy Now",
    trial: "30-day money-back guarantee"
  }
]

const faqs: Faq[] = [
  {
    question: "How are the daily quizzes structured?",
    answer: "Each quiz takes 5-15 minutes to complete and focuses on different areas of the electrician exam. Questions are carefully curated for your specific state's requirements."
  },
  {
    question: "I'm already a Sparkshift Mobile subscriber. How do I get the discounted rate?",
    answer: "Simply sign in with your Sparkshift Mobile account, and we'll automatically verify your subscription status through Firebase. Once verified, you'll immediately get access to the discounted $12.99/month rate."
  },
  {
    question: "Can I switch states if I move?",
    answer: "Yes! You can switch your state-specific content at any time through your account settings."
  },
  {
    question: "Is there a guarantee?",
    answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
  },
  {
    question: "How does the progress tracking work?",
    answer: "Our system tracks your performance in different exam topics, showing your strengths and areas that need improvement. You'll get detailed analytics and recommendations."
  }
]

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <Badge variant="outline" className="mb-4">Limited Time Offer</Badge>
        <h1 className="text-4xl font-bold">Start Your Exam Prep Journey Today</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Less than $1 a day to prepare for your electrician exam
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`${plan.popular ? "border-primary shadow-lg scale-105" : ""} 
                         ${plan.special ? "border-blue-400 shadow-lg" : ""}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  {plan.popular && <Badge>Most Popular</Badge>}
                  {plan.special && <Badge variant="secondary">Special Offer</Badge>}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                  {plan.trial && (
                    <p className="text-sm text-muted-foreground mt-1">{plan.trial}</p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
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
                <Button 
                  className="w-full text-lg py-6" 
                  variant={plan.popular ? "primary" : "outline"}
                >
                  <Link href={plan.special ? "/login/verify" : "/login"}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">100% Risk-Free Guarantee</h2>
        <p className="text-muted-foreground">
          Try our exam prep risk-free. If you're not satisfied within the first 14 days, we'll refund your subscription - no questions asked.
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact">Need help choosing? Contact us</Link>
        </Button>
      </section>
    </div>
  )
}
