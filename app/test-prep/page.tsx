import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const states = [
  { value: "ca", label: "California" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "ny", label: "New York" },
  // Add more states as needed
]

const topics = [
  { value: "general", label: "General Electrical Knowledge" },
  { value: "code", label: "National Electrical Code" },
  { value: "theory", label: "Electrical Theory" },
  { value: "safety", label: "Safety Regulations" },
  { value: "calculations", label: "Electrical Calculations" },
]

export default function TestPrepPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Electrician Exam Prep</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Practice with state-specific questions and track your progress
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Quiz</CardTitle>
            <CardDescription>5-15 minute practice sessions tailored to your state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your State</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Focus Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quiz Duration (minutes)</label>
              <Slider defaultValue={[15]} max={30} min={5} step={5} />
            </div>

            <Button className="w-full mt-4">Start Daily Quiz</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Test Generator</CardTitle>
            <CardDescription>Create a full-length practice exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your State</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Questions</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 Questions</SelectItem>
                    <SelectItem value="100">100 Questions</SelectItem>
                    <SelectItem value="150">150 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Limit</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Hours</SelectItem>
                    <SelectItem value="3">3 Hours</SelectItem>
                    <SelectItem value="4">4 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-4">Generate Practice Test</Button>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">Your Progress</h2>
        <p className="text-muted-foreground">
          Sign in to track your progress and see detailed analytics of your performance
        </p>
        <Button variant="outline">Sign In to View Progress</Button>
      </section>
    </div>
  )
}
