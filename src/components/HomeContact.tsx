import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mail, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react'

export function ContactMe() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="rounded-full gap-2 px-5">
          <MessageSquare className="w-4 h-4" />
          Contact me
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a href="mailto:bryan.cheng.hengze@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>Email</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://github.com/bryan-cheng-hengze" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="w-4 h-4 text-muted-foreground" />
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://linkedin.com/in/bryan-cheng-hengze" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-muted-foreground" />
              <span>LinkedIn</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://x.com/bryan_cheng_hengze" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-muted-foreground" />
              <span>X</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
