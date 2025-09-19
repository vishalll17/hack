import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Heart, DollarSign, MessageCircle, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AcadEase</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Your All-in-One <span className="text-primary">Student</span> Platform
          </h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Manage your academics, health, finances, and get AI assistance - all in one unified dashboard designed for
            modern students.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Timetable & Schedule</CardTitle>
              <CardDescription>
                Organize your classes, assignments, and events in one place with smart reminders.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-secondary mb-2" />
              <CardTitle>Education & Learning</CardTitle>
              <CardDescription>
                Access curated study resources and YouTube lectures tailored to your subjects.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Health & Fitness</CardTitle>
              <CardDescription>
                Track your wellness goals and get personalized fitness and wellbeing tips.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Finance & Productivity</CardTitle>
              <CardDescription>
                Manage expenses, create budgets, and stay productive with integrated task planning.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-secondary mb-2" />
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get instant help with queries, study guidance, and personalized recommendations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Unified Dashboard</CardTitle>
              <CardDescription>
                Access all your academic and personal tools from one beautiful, organized interface.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Student Life?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using AcadEase to stay organized, healthy, and successful.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 AcadEase. Empowering students to achieve their best.</p>
        </div>
      </footer>
    </div>
  )
}
