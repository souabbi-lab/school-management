import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">EduManage</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="py-24 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              School Management System
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Manage Your School{" "}
              <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              A powerful, all-in-one dashboard to manage students, teachers,
              classes, and announcements — all in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Student Management",
                  desc: "Track student enrollment, attendance, and academic progress.",
                },
                {
                  icon: GraduationCap,
                  title: "Teacher Portal",
                  desc: "Manage teacher assignments, subjects, and class schedules.",
                },
                {
                  icon: BookOpen,
                  title: "Class Organization",
                  desc: "Organize classes by grade level and assign teachers easily.",
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  desc: "Get real-time insights with stats on students, teachers, and more.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-background rounded-xl border p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your School?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join hundreds of schools already using EduManage to streamline
              their administrative processes.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">Start Now — It&apos;s Free</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EduManage. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
