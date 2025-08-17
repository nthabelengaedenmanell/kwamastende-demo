"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ListingsScreen } from "@/components/listings-screen"

interface FormData {
  fullName?: string
  email: string
  phone?: string
  password: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  })
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        setIsAuthenticated(true)
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.fullName && formData.email && formData.phone && formData.password) {
        setIsAuthenticated(true)
        toast({
          title: "Account created!",
          description: "Welcome to eKasiKwaMastende.",
        })
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (formData.email) {
        toast({
          title: "Reset link sent!",
          description: "Check your email for password reset instructions.",
        })
        setShowForgotPassword(false)
      } else {
        toast({
          title: "Error",
          description: "Please enter your email address.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  if (isAuthenticated) {
    return <ListingsScreen />
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#1a1a1a] border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
            <CardDescription className="text-gray-400">Enter your email to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                required
              />
              <Button type="submit" className="w-full bg-[#fe5228] hover:bg-[#e04620] text-white" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-400 hover:text-white"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-[#fe5228] hover:text-[#e04620]">
                  Contact Support
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1a1a1a] border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">eKasiKwaMastende</CardTitle>
          <CardDescription className="text-gray-400">
            Connecting Landlords and Tenants in South African Townships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#2a2a2a]">
              <TabsTrigger
                value="login"
                onClick={() => setIsLogin(true)}
                className="data-[state=active]:bg-[#fe5228] data-[state=active]:text-white text-gray-400"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                onClick={() => setIsLogin(false)}
                className="data-[state=active]:bg-[#fe5228] data-[state=active]:text-white text-gray-400"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-6">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#fe5228] hover:bg-[#e04620] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-[#fe5228] hover:text-[#e04620]"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-6">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#fe5228] hover:bg-[#e04620] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
