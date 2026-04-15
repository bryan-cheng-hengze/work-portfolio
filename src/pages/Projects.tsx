import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FolderKanban, Wrench, ArrowUpRight, Clock, Lock, Mail,
  Database, Bot, BarChart3, ShieldCheck
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface FeaturedProject {
  title: string
  summary: string
  outcomes: string[]
  technologies: string[]
  status: 'shipped' | 'ongoing' | 'confidential'
  icon: React.ComponentType<{ className?: string }>
}

const featured: FeaturedProject[] = [
  {
    title: 'Enterprise AIOps Platform',
    summary:
      'Designed and scaled an AIOps department, introducing AI/ML-driven observability, anomaly detection, and automated remediation across payment infrastructure.',
    outcomes: [
      'Reduced manual incident response time significantly',
      'Deployed LLM-powered agents for knowledge retrieval',
      'Unified observability across legacy and modern systems',
    ],
    technologies: ['Python', 'Langchain', 'Azure AI', 'Kafka', 'Docker'],
    status: 'ongoing',
    icon: Bot,
  },
  {
    title: 'Real-time Data Streaming Pipeline',
    summary:
      'Architected a real-time data streaming platform to power analytics, fraud signals, and operational dashboards for a high-volume payments environment.',
    outcomes: [
      'Sub-second data propagation across services',
      'KSQL-based transformations for live analytics',
      'Replaced brittle batch jobs with resilient streams',
    ],
    technologies: ['Kafka', 'KSQL', 'Python', 'MySQL', 'Docker'],
    status: 'shipped',
    icon: Database,
  },
  {
    title: 'Automated BI & Reporting Suite',
    summary:
      'Built interactive dashboards and automated reporting systems replacing fragile spreadsheets - surfacing insights to product, finance, and compliance teams.',
    outcomes: [
      'Eliminated manual monthly reports',
      'Self-serve dashboards for non-technical stakeholders',
      'Consistent, auditable data sources',
    ],
    technologies: ['Python', 'SQL', 'R', 'PHP'],
    status: 'shipped',
    icon: BarChart3,
  },
  {
    title: 'Security & RBAC Modernization',
    summary:
      'Led security-focused modernization, introducing role-based access control, workflow automation, and hardening of legacy systems.',
    outcomes: [
      'Principle-of-least-privilege across services',
      'Automated onboarding/offboarding flows',
      'Audit-ready access logs',
    ],
    technologies: ['PHP', 'MySQL', 'Linux', 'Gearman', 'Cron'],
    status: 'confidential',
    icon: ShieldCheck,
  },
]

const statusConfig = {
  shipped: { label: 'Shipped', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  ongoing: { label: 'Ongoing', className: 'bg-brand-soft text-brand border-brand/20' },
  confidential: { label: 'Confidential', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
} as const

export const ProjectsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
          <FolderKanban className="w-3.5 h-3.5 mr-1.5" />
          Projects
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Work, shipped and in motion.
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          A selection of initiatives - spanning data engineering, automation, and applied AI.
          Some are under NDA; the summaries below reflect what I can share publicly.
        </p>
      </div>

      {/* Featured */}
      <section className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {featured.map(({ title, summary, outcomes, technologies, status, icon: Icon }) => {
          const s = statusConfig[status]
          return (
            <Card key={title} className="group relative overflow-hidden border-border bg-card card-elevated transition-all hover:border-brand/40">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-[0.12em] font-semibold ${s.className}`}>
                      {s.label}
                    </Badge>
                  </div>
                </div>

                <h3 className="mt-5 text-lg sm:text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {summary}
                </p>

                <ul className="mt-5 space-y-2">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 h-1 w-1 rounded-full bg-brand flex-shrink-0" />
                      <span className="text-foreground/90 leading-snug">{o}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Confidentiality */}
      <section className="mt-16 sm:mt-20">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-card border border-border">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Under NDA</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Most of my production work is proprietary. I'm happy to walk through architecture,
                trade-offs, and outcomes in a conversation. Case studies and public projects are coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public projects coming soon */}
      <section className="mt-8">
        <div className="rounded-3xl border border-dashed border-border bg-card p-8 sm:p-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand animate-subtle-pulse">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight">Public case studies - coming soon</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            I'm preparing detailed write-ups of select projects. In the meantime, the best way to explore my work is a direct conversation.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="mailto:bryan.chengze@gmail.com">
              <Button className="rounded-full gap-2"><Mail className="w-4 h-4" /> Request a walkthrough</Button>
            </a>
            <Link to="/tools">
              <Button variant="outline" className="rounded-full gap-2">
                <Wrench className="w-4 h-4" /> Explore my stack
              </Button>
            </Link>
            <Link to="/journey">
              <Button variant="ghost" className="rounded-full gap-2">
                See my journey <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
