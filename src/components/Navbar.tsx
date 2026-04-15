"use client"

import { Link, useLocation } from "react-router-dom"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"
import { ModeToggle } from "./ModeToggle"
import { listNavItems } from "@/data/navbar"
import { cn } from "@/lib/utils"

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
]

const contactLinks = [
  { label: "Email", href: "mailto:bryan.cheng.hengze@gmail.com", icon: Mail, external: true },
  { label: "GitHub", href: "https://github.com/bryan-cheng-hengze", icon: Github, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/bryan-cheng-hengze", icon: Linkedin, external: true },
  { label: "X", href: "https://x.com/bryanchengze", icon: Twitter, external: true },
]

export function HomeNavBar() {
  const { pathname } = useLocation()

  const navLinkStyle = (active: boolean) =>
    cn(
      "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "text-muted-foreground hover:text-foreground hover:bg-accent",
      active && "text-foreground bg-accent"
    )

  return (
    <div className="flex items-center justify-between w-full px-5 lg:px-8 h-16">
      <Link to="/" className="flex items-center group" aria-label="Home">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-transparent ring-1 ring-border">
          <img src="/logo.png" alt="Bryan Cheng" className="h-7 w-7 object-contain" />
        </span>
      </Link>

      <NavigationMenu viewport={false} className="mx-auto">
        <NavigationMenuList className="gap-1">
          {primaryLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link to={link.href} className={navLinkStyle(pathname === link.href)}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent focus:bg-transparent focus:text-muted-foreground focus-visible:bg-transparent data-[state=open]:bg-accent data-[state=open]:text-foreground data-[state=closed]:bg-transparent data-[state=closed]:text-muted-foreground">
              Profile
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[340px] gap-1 p-2">
                {listNavItems.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className="block rounded-md p-3 hover:bg-accent transition-colors"
                      >
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-snug">
                          {item.description}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent focus:bg-transparent focus:text-muted-foreground focus-visible:bg-transparent data-[state=open]:bg-accent data-[state=open]:text-foreground data-[state=closed]:bg-transparent data-[state=closed]:text-muted-foreground">
              Contact
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[240px] p-2">
                <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Get in touch
                </p>
                <ul className="flex flex-col gap-0.5">
                  {contactLinks.map((item) => (
                    <li key={item.label}>
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="!flex-row !items-center !gap-3 rounded-md !p-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                            <item.icon className="h-4 w-4" />
                          </span>
                          <span className="flex-1 truncate">{item.label}</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center">
        <ModeToggle />
      </div>
    </div>
  )
}
