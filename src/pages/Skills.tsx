import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Code2, Server, Cloud, Gauge, CheckCircle2
} from 'lucide-react'

type Skill = { name: string; level: number }
type SkillCategory = {
  category: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Development',
    icon: Code2,
    description: 'Building responsive, accessible, and maintainable interfaces.',
    skills: [
      { name: 'HTML / CSS', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'Tailwind CSS', level: 78 },
      { name: 'TypeScript', level: 75 },
      { name: 'Bootstrap', level: 75 },
      { name: 'React', level: 60 },
      { name: 'Vue.js', level: 60 },
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    description: 'Designing services, APIs, and data pipelines in production.',
    skills: [
      { name: 'Python', level: 97 },
      { name: 'PHP', level: 92 },
      { name: 'SQL', level: 84 },
      { name: 'R', level: 82 },
      { name: 'Java', level: 75 },
      { name: 'NoSQL', level: 75 },
      { name: 'KSQL', level: 64 },
      { name: 'Haskell', level: 60 },
      { name: 'C', level: 55 },
    ],
  },
  {
    category: 'Database & Cloud',
    icon: Cloud,
    description: 'Storage, scale, and infrastructure across providers.',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'Docker', level: 70 },
      { name: 'Azure', level: 70 },
      { name: 'AWS', level: 68 },
      { name: 'Kafka', level: 60 },
      { name: 'MongoDB', level: 60 },
      { name: 'Cloudflare', level: 55 },
    ],
  },
]

const getProficiency = (level: number) => {
  if (level >= 85) return { label: 'Expert', color: 'text-emerald-600 dark:text-emerald-400' }
  if (level >= 70) return { label: 'Proficient', color: 'text-brand' }
  if (level >= 55) return { label: 'Intermediate', color: 'text-amber-600 dark:text-amber-400' }
  return { label: 'Familiar', color: 'text-muted-foreground' }
}

export const SkillsPage: React.FC = () => {
  const totalSkills = skillCategories.reduce((acc, c) => acc + c.skills.length, 0)
  const expertCount = skillCategories.reduce(
    (acc, c) => acc + c.skills.filter((s) => s.level >= 85).length,
    0,
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
          <Gauge className="w-3.5 h-3.5 mr-1.5" />
          Skills
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Languages, tools, and proficiencies.
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          An overview of technical skills I've applied in production - continuously sharpened through
          hands-on work and deliberate learning.
        </p>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-3 gap-px rounded-2xl border border-border bg-border overflow-hidden max-w-xl">
          {[
            { value: totalSkills, label: 'Skills tracked' },
            { value: expertCount, label: 'At expert level' },
            { value: skillCategories.length, label: 'Domains' },
          ].map((s) => (
            <div key={s.label} className="bg-card p-4 sm:p-5">
              <div className="text-xl sm:text-2xl font-bold">{s.value}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {skillCategories.map(({ category, icon: Icon, description, skills }) => (
          <div
            key={category}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7 card-elevated"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{category}</h2>
                <p className="text-xs text-muted-foreground">{skills.length} skills</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="mt-6 space-y-4">
              {skills.map((skill) => {
                const prof = getProficiency(skill.level)
                return (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium truncate">{skill.name}</span>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${prof.color}`}>
                        {prof.label}
                      </span>
                    </div>
                    <div className="relative w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-brand/70 transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="text-xs uppercase tracking-[0.14em] font-semibold text-muted-foreground">Proficiency</span>
          {[
            { label: 'Expert', threshold: '85%+', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Proficient', threshold: '70–84%', color: 'text-brand' },
            { label: 'Intermediate', threshold: '55–69%', color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Familiar', threshold: '< 55%', color: 'text-muted-foreground' },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${p.color}`} />
              <span className={`font-semibold ${p.color}`}>{p.label}</span>
              <span className="text-muted-foreground text-xs">({p.threshold})</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
