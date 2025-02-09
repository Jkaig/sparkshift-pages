import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'expo-router';
import { routes } from '../../lib/routes';

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
              <Input
                id="email"
                label="Email"
                type="email"
                required
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                label="Password"
                type="password"
                required
                secureTextEntry
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href={routes.auth.forgotPassword} asChild>
              <a className="text-sm text-muted-foreground hover:underline">
                Forgot password?
              </a>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <Link href={routes.auth.signup} asChild>
              <a className="text-sm text-primary hover:underline">
                Sign up
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
