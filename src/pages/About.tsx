import React from 'react'
import profileImage from '../assets/profile.jpg'
import resume from '../assets/Bryan Cheng Hengze - Resume.pdf'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download, ArrowUpRight, Zap, Layers, Cpu, GitBranch,
  Sparkles, HeartHandshake, BookOpen, Compass, Workflow
} from 'lucide-react'

const expertise = [
  { icon: Workflow, title: 'Automation', text: 'Workflow automation, RPA, and orchestration of complex pipelines.' },
  { icon: Layers, title: 'Data engineering', text: 'Analysis, visualization, and real-time data streaming with Kafka / KSQL.' },
  { icon: Zap, title: 'Web development', text: 'Modern full-stack apps with a bias toward maintainable architecture.' },
  { icon: Cpu, title: 'AI & ML', text: 'LLM agents, RAG, and embedding production ML into business workflows.' },
]

const values = [
  { icon: Compass, title: 'Outcome-driven', text: 'I align engineering choices with business impact - not the other way around.' },
  { icon: HeartHandshake, title: 'Collaborative', text: 'Great software is a team sport. I thrive in cross-functional environments.' },
  { icon: BookOpen, title: 'Always learning', text: 'Curiosity is the multiplier. I invest in learning as a continuous practice.' },
  { icon: GitBranch, title: 'Pragmatic', text: 'Clean, maintainable code - without dogma. Ship value, iterate, improve.' },
]

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card card-elevated">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mask-fade-bottom pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/20 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-6 sm:p-10 md:p-12">
          <div className="md:col-span-1 flex md:justify-start justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand/30 to-transparent blur-xl opacity-70" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden ring-1 ring-border">
                <img src={profileImage} alt="Bryan Cheng Hengze" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Badge variant="outline" className="mb-4 bg-brand-soft text-brand border-brand/20">
              <Sparkles className="w-3 h-3 mr-1.5" />
              About me
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Hi, I'm Bryan - <span className="text-gradient-brand">software engineer</span> focused on practical, impactful systems.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              I craft end-to-end software solutions that solve real-world business problems.
              My approach blends deep technical knowledge with a strong sense of business context -
              resulting in systems that are scalable, secure, and genuinely useful.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={resume} download="Bryan Cheng Hengze - Resume.pdf">
                <Button className="rounded-full gap-2"><Download className="w-4 h-4" /> Résumé</Button>
              </a>
              <Link to="/projects">
                <Button variant="outline" className="rounded-full gap-2">Projects <ArrowUpRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Technical expertise</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Areas I operate across
          </h2>
          <p className="mt-3 text-muted-foreground text-base leading-relaxed">
            From data pipelines to production-grade AI systems - a generalist spine with deep specialism.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {expertise.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 hover:border-brand/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Professional philosophy</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
            How I approach the work
          </h2>
          <p className="mt-3 text-muted-foreground text-base leading-relaxed">
            My work is driven by curiosity and a commitment to continuous improvement. I thrive in dynamic
            environments and love collaborating across functions to turn ideas into innovative products.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond the code */}
      <section className="mt-16 sm:mt-20">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Beyond the code</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Life outside the terminal</h2>
            </div>
            <div className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Outside of work, I'm constantly exploring new technologies, contributing to open-source projects,
                and sharing knowledge with the developer community.
              </p>
              <p>
                I'm passionate about staying at the forefront of innovation and believe in giving back through
                mentorship and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 sm:mt-20 mb-4">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 card-elevated">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Let's connect.</h3>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Open to new opportunities, interesting collaborations, or a chat about the ever-evolving world of tech.
            </p>
          </div>
          <a href="mailto:bryan.chengze@gmail.com">
            <Button size="lg" className="rounded-full gap-2 whitespace-nowrap">
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
