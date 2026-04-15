import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ThemeProvider } from './ThemeProvider'
import { HomeNavBar } from './Navbar'
import { HomeSidebar } from './Sidebar'
import { SidebarProvider, SidebarTrigger, SidebarInset } from './ui/sidebar'
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'
import { Separator } from './ui/separator'

interface LayoutProps {
  children: React.ReactNode
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-secondary/40 mt-auto">
      <div className="container mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
          <div className="sm:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground font-semibold tracking-tight">
                B
              </span>
              <span className="font-semibold text-base tracking-tight">Bryan Cheng Hengze</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Data Analyst · DevSecOps · AI Engineer. Transforming complex challenges into scalable, intelligent software.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { href: 'mailto:bryan.chengze@gmail.com', icon: Mail, label: 'Email' },
                { href: 'https://github.com/bryan-cheng-hengze', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/bryan-cheng-hengze', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://x.com/bryanchengze', icon: Twitter, label: 'X' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-brand/40 hover:bg-brand-soft transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <h3 className="font-semibold text-xs tracking-[0.12em] uppercase text-foreground mb-4">Explore</h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'Projects', href: '/projects' },
                { label: 'Journey', href: '/journey' },
                { label: 'Roadmap', href: '/roadmap' },
                { label: 'Skills', href: '/skills' },
                { label: 'Tools', href: '/tools' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="sm:col-span-4">
            <h3 className="font-semibold text-xs tracking-[0.12em] uppercase text-foreground mb-4">Get in touch</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Open to select freelance work and interesting collaborations.
            </p>
            <a
              href="mailto:bryan.chengze@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
            >
              bryan.chengze@gmail.com
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Bryan Cheng Hengze. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()

  if (location.pathname === '/') {
    return (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-background text-foreground flex w-full">
          <div className="max-[720px]:block hidden">
            <HomeSidebar />
          </div>

          <SidebarInset className="flex-1 flex flex-col min-h-screen">
            <div className="max-[720px]:flex hidden sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border items-center justify-between px-4 h-14">
              <SidebarTrigger />
              <Link to="/" className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground text-xs font-semibold">B</span>
                <span className="text-sm font-semibold tracking-tight">Bryan Cheng</span>
              </Link>
              <div className="w-9" />
            </div>

            <div className="min-[721px]:block hidden sticky top-0 z-50 bg-background/75 backdrop-blur-md border-b border-border">
              <div className="w-full">
                <HomeNavBar />
              </div>
            </div>

            <main className="flex-1 w-full">
              <div className="container mx-auto px-5 sm:px-8 py-10 sm:py-16">
                {children}
              </div>
            </main>

            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
