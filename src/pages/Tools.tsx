import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Wrench, Monitor, Layers, Database, Users,
  Cloud, Workflow
} from 'lucide-react'

type Tool = { name: string; description: string }
type ToolCategory = {
  category: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  accent: string
  tools: Tool[]
}

const toolCategories: ToolCategory[] = [
  {
    category: 'Development Environment',
    description: 'My daily driver for writing, debugging, and shipping code.',
    icon: Monitor,
    accent: 'from-brand/20 to-transparent',
    tools: [
      { name: 'Cursor', description: 'Primary AI-powered code editor with a rich extension ecosystem.' },
      { name: 'Git', description: 'Version control and collaboration across every project.' },
      { name: 'Terminal', description: 'Command line, scripting, and quick automation.' },
      { name: 'Postman', description: 'API development, testing, and collection-based workflows.' },
    ],
  },
  {
    category: 'Frontend Tooling',
    description: 'Design, prototype, and ship polished user experiences.',
    icon: Layers,
    accent: 'from-sky-500/20 to-transparent',
    tools: [
      { name: 'MCP Frontend Tools', description: 'Model Context Protocol helpers for frontend workflows.' },
      { name: 'Figma', description: 'Design collaboration and component-driven UI work.' },
      { name: 'DevTools', description: 'Browser debugging, profiling, and performance analysis.' },
      { name: 'Excalidraw', description: 'Whiteboarding and lightweight diagramming.' },
    ],
  },
  {
    category: 'Backend & Database',
    description: 'Services, data, and the plumbing that holds it all together.',
    icon: Database,
    accent: 'from-emerald-500/20 to-transparent',
    tools: [
      { name: 'Docker', description: 'Containerization and consistent environments.' },
      { name: 'AWS Console', description: 'Cloud services management and provisioning.' },
      { name: 'phpMyAdmin', description: 'MySQL administration and exploratory queries.' },
      { name: 'Cloudflare', description: 'DNS, CDN, and edge configuration.' },
    ],
  },
  {
    category: 'Productivity',
    description: 'Keeping teams and ideas aligned end to end.',
    icon: Users,
    accent: 'from-amber-500/20 to-transparent',
    tools: [
      { name: 'Google NotebookLM', description: 'AI-powered note-taking and synthesis.' },
      { name: 'Slack / Telegram / Teams', description: 'Team communication across contexts.' },
      { name: 'Trello', description: 'Project management and lightweight task tracking.' },
      { name: 'Miro', description: 'Collaborative online whiteboard for planning and design.' },
    ],
  },
  {
    category: 'Cloud & AI',
    description: 'Applied AI and cloud-native services powering production systems.',
    icon: Cloud,
    accent: 'from-violet-500/20 to-transparent',
    tools: [
      { name: 'Microsoft Azure', description: 'Cognitive Services, Azure ML, AI Search, Graph API.' },
      { name: 'Microsoft Copilot Studio', description: 'Design environment for building generative AI agents.' },
      { name: 'LangChain', description: 'Framework for orchestrating LLM-powered applications.' },
      { name: 'AI Models / Agents', description: 'OpenAI, Anthropic, Deepseek, Llama, and more.' },
    ],
  },
  {
    category: 'Automation & Workflow',
    description: 'Turning repetitive work into reliable, scheduled systems.',
    icon: Workflow,
    accent: 'from-rose-500/20 to-transparent',
    tools: [
      { name: 'Automation Anywhere', description: 'RPA platform for advanced task and workflow automation.' },
      { name: 'Selenium', description: 'Web automation and end-to-end testing.' },
      { name: 'Cron', description: 'Scheduled job execution across services.' },
      { name: 'Gearman Worker', description: 'Distributed background-task execution.' },
    ],
  },
]

export const ToolsPage: React.FC = () => {
  const total = toolCategories.reduce((acc, c) => acc + c.tools.length, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
          <Wrench className="w-3.5 h-3.5 mr-1.5" />
          Tools
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          The tools that power my workflow.
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          A curated toolkit across development, design, cloud, and automation - {total}+ tools I've used
          to bring ideas to life and maintain productive, reliable systems.
        </p>
      </div>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {toolCategories.map(({ category, description, icon: Icon, accent, tools }) => (
          <div
            key={category}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7 card-elevated transition-all hover:border-brand/30"
          >
            <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-80 bg-gradient-to-br ${accent} pointer-events-none`} />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{category}</h2>
                  <p className="text-xs text-muted-foreground">{tools.length} tools</p>
                </div>
              </div>
            </div>

            <p className="relative mt-4 text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="relative mt-6 space-y-3">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group rounded-xl border border-border/60 bg-background/60 backdrop-blur px-4 py-3 hover:border-brand/30 hover:bg-background transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight">{tool.name}</h4>
                      <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground leading-snug">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
