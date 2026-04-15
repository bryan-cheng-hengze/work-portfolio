import React from 'react'
import { events } from '@/data/events'
import { Badge } from '@/components/ui/badge'
import {
  Calendar, Route, TrendingUp, Award, Trophy, BriefcaseBusiness,
  School, ChevronsUp, CheckCircle2
} from 'lucide-react'

const iconFor = (iconType: string) => {
  switch (iconType) {
    case 'promotion': return TrendingUp
    case 'award': return Award
    case 'achievement': return Trophy
    case 'work': return BriefcaseBusiness
    case 'school': return School
    default: return ChevronsUp
  }
}

const labelFor = (iconType: string) => {
  switch (iconType) {
    case 'promotion': return 'Promotion'
    case 'award': return 'Award'
    case 'achievement': return 'Achievement'
    case 'work': return 'Role'
    case 'school': return 'Education'
    default: return 'Milestone'
  }
}

export const JourneyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
          <Route className="w-3.5 h-3.5 mr-1.5" />
          Journey
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Milestones, growth, and the path so far.
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          A timeline of roles, awards, and academic chapters that have shaped my work
          as an engineer.
        </p>
      </div>

      <div className="relative mt-14 sm:mt-16">
        {/* Vertical line */}
        <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        <div className="space-y-8 sm:space-y-10">
          {events.map((event, index) => {
            const Icon = iconFor(event.iconType)
            const label = labelFor(event.iconType)
            return (
              <div key={index} className="relative pl-16 sm:pl-20">
                {/* Icon node */}
                <div className="absolute left-0 top-1 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
                  <Icon className="w-5 h-5 text-brand" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-brand/30 card-elevated">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-[0.14em] font-semibold bg-brand-soft text-brand border-brand/20">
                      {label}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {event.extendedDescription}
                  </p>

                  {event.events && event.events.length > 0 && (
                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                      {event.events.map((subEvent, subIndex) => (
                        <li key={subIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              subEvent.isChecked ? 'text-brand' : 'text-muted-foreground'
                            }`}
                          />
                          <span className="text-foreground/90 leading-snug">{subEvent.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
