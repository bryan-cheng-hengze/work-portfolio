import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Compass, Target, Rocket, Mountain, CheckCircle2, Circle, Timer,
  Sparkles
} from 'lucide-react'

type Status = 'completed' | 'in-progress' | 'planned'

interface Goal {
  title: string
  description: string
  status: Status
}

interface RoadmapSection {
  category: string
  horizon: string
  tagline: string
  icon: React.ComponentType<{ className?: string }>
  goals: Goal[]
}

const roadmap: RoadmapSection[] = [
  {
    category: 'Short-term goals',
    horizon: '6–12 months',
    tagline: 'Sharpening the edges of my current stack.',
    icon: Target,
    goals: [
      {
        title: 'Advanced React patterns',
        description: 'Master compound components, render props, and advanced hooks for building composable UI systems.',
        status: 'in-progress',
      },
      {
        title: 'Full-stack TypeScript',
        description: 'Build end-to-end applications with TypeScript on both frontend and backend.',
        status: 'planned',
      },
      {
        title: 'Cloud architecture',
        description: 'Deepen understanding of AWS/Azure cloud services and serverless architectures.',
        status: 'planned',
      },
      {
        title: 'Testing excellence',
        description: 'Implement comprehensive testing strategies across unit, integration, and E2E layers.',
        status: 'in-progress',
      },
    ],
  },
  {
    category: 'Medium-term goals',
    horizon: '1–2 years',
    tagline: 'Leveling up as a systems-minded engineer.',
    icon: Rocket,
    goals: [
      {
        title: 'System design mastery',
        description: 'Design scalable, distributed systems and reason about microservices trade-offs.',
        status: 'planned',
      },
      {
        title: 'DevOps & CI/CD',
        description: 'Containerization, orchestration, and automated deployment pipelines.',
        status: 'planned',
      },
      {
        title: 'Machine learning integration',
        description: 'Integrate ML models into web applications and learn MLOps practices.',
        status: 'planned',
      },
      {
        title: 'Technical leadership',
        description: 'Strengthen mentorship, code review, and technical decision-making.',
        status: 'planned',
      },
    ],
  },
  {
    category: 'Long-term vision',
    horizon: '4+ years',
    tagline: 'Building broader impact as an engineer and communicator.',
    icon: Mountain,
    goals: [
      {
        title: 'Principal engineer role',
        description: 'Advance to a principal role with deep system architecture responsibility.',
        status: 'planned',
      },
      {
        title: 'Open-source contribution',
        description: 'Become a significant contributor to major open-source projects.',
        status: 'planned',
      },
      {
        title: 'Technical innovation',
        description: 'Drive innovation in development practices and emerging technologies.',
        status: 'planned',
      },
      {
        title: 'Knowledge sharing',
        description: 'Speak at conferences and write technical articles to share knowledge.',
        status: 'planned',
      },
    ],
  },
]

const statusMeta: Record<Status, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  badgeClass: string
  iconClass: string
}> = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  'in-progress': {
    label: 'In progress',
    icon: Timer,
    badgeClass: 'bg-brand-soft text-brand border-brand/20',
    iconClass: 'text-brand',
  },
  planned: {
    label: 'Planned',
    icon: Circle,
    badgeClass: 'bg-secondary text-muted-foreground border-border',
    iconClass: 'text-muted-foreground',
  },
}

export const RoadmapPage: React.FC = () => {
  const stats = roadmap.reduce(
    (acc, s) => {
      for (const g of s.goals) acc[g.status]++
      return acc
    },
    { completed: 0, 'in-progress': 0, planned: 0 } as Record<Status, number>,
  )

  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
          <Compass className="w-3.5 h-3.5 mr-1.5" />
          Roadmap
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Where I'm heading next.
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          A strategic outline of my learning and career path - across short-term focus, medium-term growth,
          and the longer horizon.
        </p>

        {/* Status summary */}
        <div className="mt-8 grid grid-cols-3 gap-px rounded-2xl border border-border bg-border overflow-hidden max-w-lg">
          {(['in-progress', 'planned', 'completed'] as Status[]).map((s) => {
            const m = statusMeta[s]
            const Icon = m.icon
            return (
              <div key={s} className="bg-card p-4">
                <Icon className={`w-4 h-4 ${m.iconClass}`} />
                <div className="mt-2 text-xl font-bold">{stats[s]}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{m.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-14 space-y-12 sm:space-y-16">
        {roadmap.map(({ category, horizon, tagline, icon: Icon, goals }) => (
          <section key={category}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{category}</h2>
                  <p className="text-sm text-muted-foreground">{tagline}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-medium self-start sm:self-auto">
                {horizon}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {goals.map((goal) => {
                const m = statusMeta[goal.status]
                const StatusIcon = m.icon
                return (
                  <div
                    key={goal.title}
                    className="rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-brand/30 card-elevated"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold tracking-tight">{goal.title}</h3>
                      <Badge variant="outline" className={`text-[10px] uppercase tracking-[0.12em] font-semibold whitespace-nowrap ${m.badgeClass}`}>
                        <StatusIcon className={`w-3 h-3 mr-1 ${m.iconClass}`} />
                        {m.label}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-brand-soft/60 to-secondary/40 p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Philosophy
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Continuous learning, always.</h3>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            This roadmap is a living document that evolves with industry trends, personal interests, and
            career opportunities. I believe in deliberate learning, hands-on practice, and staying curious
            while anchoring everything in strong fundamentals.
          </p>
        </div>
      </section>
    </div>
  )
}
