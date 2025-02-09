import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'expo-router';

export default function LoginPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" asChild>
              <a className="text-sm text-muted-foreground hover:underline">
                Forgot password?
              </a>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" asChild>
              <a className="text-sm text-primary hover:underline">
                Sign up
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
