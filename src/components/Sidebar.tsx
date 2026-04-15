import { Mail, Github, Linkedin, Twitter, Home, User, FolderOpen } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./ModeToggle"
import { listNavItems } from "@/data/navbar"

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: User },
  { title: "Projects", url: "/projects", icon: FolderOpen },
]

const contactItems = [
  { title: "Email", url: "mailto:bryan.cheng.hengze@gmail.com", icon: Mail },
  { title: "GitHub", url: "https://github.com/bryan-cheng-hengze", icon: Github },
  { title: "LinkedIn", url: "https://linkedin.com/in/bryan-cheng-hengze", icon: Linkedin },
  { title: "X", url: "https://x.com/bryan_cheng_hengze", icon: Twitter },
]

export function HomeSidebar() {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()
  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-transparent ring-1 ring-border shadow-sm">
            <img src="/logo.png" alt="Bryan Cheng" className="h-7 w-7 object-contain" />
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url} onClick={handleItemClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {listNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link to={item.href} onClick={handleItemClick}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Connect</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contactItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={handleItemClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center justify-between rounded-md border border-border bg-card px-2 py-1.5">
          <span className="text-xs text-muted-foreground px-1">Theme</span>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
