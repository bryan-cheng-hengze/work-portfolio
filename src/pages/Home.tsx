import { useEffect, useRef, useState } from 'react'
import { HomeNavBar } from '../components/Navbar'
import { HomeSidebar } from '../components/Sidebar'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '../components/ui/sidebar'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ContactMe } from '../components/HomeContact'
import profileImage from '../assets/profile.jpg'
import VerticalEventTimeline from '../components/HomeJourney'
import resume from '../assets/Bryan Cheng Hengze - Resume.pdf'
import HomeCarousel from '../components/HomeCarousel'
import { languages } from '../data/languages'
import { projects } from '../data/projects'
import { tools } from '../data/tools'
import {
  Mail, Github, Linkedin, Twitter,
  Download, ArrowUpRight, Sparkles, Code2, Database, Shield, BrainCircuit
} from 'lucide-react'
import { Link } from 'react-router-dom'

type Stat = { to?: number; suffix?: string; display?: string; label: string }

const stats: Stat[] = [
  { to: 3, suffix: '+', label: 'Years experience' },
  { to: 30, suffix: '+', label: 'Languages & tools' },
  { to: 50, suffix: '+', label: 'Frameworks & platforms' },
  { display: 'E3', label: 'Senior level' },
]

function CountUp({ to, delay = 0, duration = 1600 }: { to: number; delay?: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const startAt = performance.now() + delay
            const tick = (now: number) => {
              if (now < startAt) {
                requestAnimationFrame(tick)
                return
              }
              const t = Math.min(1, (now - startAt) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(Math.round(to * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, delay, duration])

  return <span ref={ref}>{value}</span>
}

const expertise = [
  {
    icon: Database,
    title: 'Data & Analytics',
    description: 'Pipelines, dashboards, and real-time streaming with SQL, Python, and KSQL.',
  },
  {
    icon: Shield,
    title: 'DevSecOps',
    description: 'Secure automation, RBAC, and modernization of legacy systems at scale.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Engineering',
    description: 'LLM agents, ML integration, and AIOps across production workloads.',
  },
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'End-to-end apps in modern frameworks aligned with business goals.',
  },
]

const TRAIL_LEN = 10

function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const target = useRef({ x: 0, y: 0, set: false })
  const head = useRef({ x: 0, y: 0 })
  const trail = useRef<Array<{ x: number; y: number }>>([])
  const dots = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    const el = heroRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const syncSize = () => {
        const rect = el.getBoundingClientRect()
        const w = rect.width
        const h = rect.height
        const bw = Math.max(1, Math.ceil(w * dpr))
        const bh = Math.max(1, Math.ceil(h * dpr))
        if (canvas.width !== bw) canvas.width = bw
        if (canvas.height !== bh) canvas.height = bh
      }
    syncSize()

    const getBrand = () => {
      const raw = getComputedStyle(el).getPropertyValue('--brand').trim()
      return raw || 'oklch(0.7 0.15 250)'
    }
    let brand = getBrand()
    const themeObserver = new MutationObserver(() => { brand = getBrand() })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let raf = 0
    const tick = () => {
      syncSize()
      const tx = target.current.x
      const ty = target.current.y
      head.current.x += (tx - head.current.x) * 0.22
      head.current.y += (ty - head.current.y) * 0.22
      dots.current.x += (tx - dots.current.x) * 0.05
      dots.current.y += (ty - dots.current.y) * 0.05

      if (!hovering.current) {
        trail.current.length = 0
      } else {
        const last = trail.current[trail.current.length - 1]
        const moved = last
          ? Math.hypot(head.current.x - last.x, head.current.y - last.y)
          : Infinity
        if (moved > 1.5) {
          trail.current.push({ x: head.current.x, y: head.current.y })
          if (trail.current.length > TRAIL_LEN) trail.current.shift()
        } else {
          if (trail.current.length > 0) trail.current.shift()
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalCompositeOperation = 'lighter'
      const n = trail.current.length
      for (let i = 0; i < n; i++) {
        const p = trail.current[i]
        const k = n <= 1 ? 1 : i / (n - 1)
        const ease = k * k
        const size = 20 + ease * 90
        ctx.globalAlpha = ease * 0.18
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        grad.addColorStop(0, brand)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(p.x - size, p.y - size, size * 2, size * 2)
      }
      ctx.globalAlpha = 1

      el.style.setProperty('--dots-x', `${dots.current.x}px`)
      el.style.setProperty('--dots-y', `${dots.current.y}px`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
    }
  }, [])

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (!target.current.set) {
      head.current.x = dots.current.x = x
      head.current.y = dots.current.y = y
      trail.current = []
      target.current.set = true
    }
    target.current.x = x
    target.current.y = y
  }

  const handleHeroMouseEnter = () => {
    hovering.current = true
    heroRef.current?.style.setProperty('--cursor-opacity', '1')
  }

  const handleHeroMouseLeave = () => {
    hovering.current = false
    heroRef.current?.style.setProperty('--cursor-opacity', '0')
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex w-full">
        <div className="max-[720px]:block hidden">
          <HomeSidebar />
        </div>

        <SidebarInset className="flex-1">
          <div className="max-[720px]:flex hidden sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border items-center justify-between px-4 h-14">
            <SidebarTrigger />
            <Link to="/" className="flex items-center" aria-label="Home">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white ring-1 ring-border shadow-sm">
                <img src="/logo.png" alt="Bryan Cheng" className="h-6 w-6 object-contain" />
              </span>
            </Link>
            <div className="w-9" />
          </div>

          <div className="min-[721px]:block hidden sticky top-0 z-50 bg-background/75 backdrop-blur-md border-b border-border">
            <HomeNavBar />
          </div>

          <main className="w-full">
            {/* Hero */}
            <section
              ref={heroRef}
              onMouseMove={handleHeroMouseMove}
              onMouseEnter={handleHeroMouseEnter}
              onMouseLeave={handleHeroMouseLeave}
              className="relative overflow-hidden hero-interactive bg-background isolate"
            >
              <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full hero-cursor-glow pointer-events-none" />
              <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
              <div className="absolute inset-0 hero-dots-spotlight pointer-events-none" />

              <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
                <div className="max-w-3xl">
                  <Badge
                    variant="outline"
                    className="mb-6 bg-card/60 backdrop-blur border-border gap-1.5 py-1.5 px-3 text-xs font-medium"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Available for select opportunities
                  </Badge>

                  <div className="flex items-center gap-3 mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    <span className="h-px w-8 bg-border" />
                    Portfolio
                  </div>

                  <h1 className="font-semibold tracking-[-0.035em] leading-[0.95] text-balance text-foreground text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-7xl">
                    Bryan Cheng
                    <span className="block sm:inline mt-1 sm:mt-0 sm:ml-4 font-light italic text-foreground/70">
                      Hengze
                    </span>
                  </h1>

                  <div className="mt-7 flex items-center gap-4">
                    <span className="h-px flex-shrink-0 w-10 bg-foreground/30" />
                    <p className="text-sm sm:text-base uppercase tracking-[0.22em] text-muted-foreground font-medium">
                      Data <span className="text-foreground/30 mx-1.5">/</span>{' '}
                      DevSecOps <span className="text-foreground/30 mx-1.5">/</span>{' '}
                      AI Engineering
                    </p>
                  </div>

                  <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    I design and build end-to-end software solutions that turn complex business problems into scalable, intelligent systems - combining automation, data, and AI with a pragmatic, outcome-driven approach.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <a href={resume} download="Bryan Cheng Hengze - Resume.pdf">
                      <Button size="lg" className="gap-2 rounded-full px-6 shadow-sm">
                        <Download className="w-4 h-4" />
                        Download résumé
                      </Button>
                    </a>
                    <ContactMe />
                    <Link to="/projects">
                      <Button variant="ghost" size="lg" className="gap-2 rounded-full px-5">
                        View projects
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats strip */}
                <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {stats.map((s, i) => (
                    <div
                      key={s.label}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card/80 hover:shadow-md"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-brand/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="flex items-baseline gap-0.5 tabular-nums">
                        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                          {s.display ?? <CountUp to={s.to ?? 0} delay={i * 140} />}
                        </span>
                        {s.suffix && (
                          <span className="text-2xl sm:text-3xl font-light text-brand translate-y-[-1px]">
                            {s.suffix}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About intro */}
            <section className="border-t border-border bg-secondary/40">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className="lg:col-span-4 flex justify-center lg:justify-start">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand/30 to-transparent blur-2xl opacity-60" />
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden ring-1 ring-border card-elevated">
                        <img
                          src={profileImage}
                          alt="Bryan Cheng Hengze"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">About me</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                      Engineering meaningful outcomes through code.
                    </h2>
                    <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                      With over three years of professional experience, I specialize in designing and developing
                      end-to-end software solutions that solve complex business problems. My expertise spans
                      automation, data analysis, real-time streaming, web development, and artificial intelligence.
                    </p>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                      By combining technical rigor with a practical, solution-oriented mindset, I make sure every
                      project aligns with both technical standards and business goals.
                    </p>
                    <div className="mt-8">
                      <Link to="/about">
                        <Button variant="outline" className="rounded-full gap-2">
                          More about me <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Expertise */}
            <section className="border-t border-border">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">What I do</span>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                    Practice areas I bring to every project.
                  </h2>
                  <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                    A blend of analytical rigor, secure engineering, and applied AI - delivered as reliable,
                    production-ready software.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {expertise.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand/40 hover:shadow-md"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Journey */}
            <section className="border-t border-border bg-secondary/40">
              <div className="container mx-auto py-20 sm:py-28">
                <VerticalEventTimeline />
              </div>
            </section>

            {/* Languages */}
            <section className="border-t border-border">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <HomeCarousel
                  title="Languages & Tools"
                  description="Programming languages and tools I've worked with in production."
                  data={languages}
                  cardWidth={280}
                  gap={16}
                  exploreLink="/skills"
                  showCount={true}
                  count={30}
                />
              </div>
            </section>

            {/* Frameworks */}
            <section className="border-t border-border bg-secondary/40">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <HomeCarousel
                  title="Frameworks & Infrastructure"
                  description="Frameworks, infrastructure, and operation tools across my stack."
                  data={tools}
                  cardWidth={280}
                  gap={16}
                  exploreLink="/tools"
                  showCount={true}
                  count={50}
                />
              </div>
            </section>

            {/* Projects */}
            <section className="border-t border-border">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <HomeCarousel
                  title="Selected Projects"
                  description="A curated selection of things I've built and shipped."
                  data={projects}
                  cardWidth={280}
                  gap={16}
                  exploreLink="/projects"
                  showCount={true}
                  count={10}
                />
              </div>
            </section>

            {/* Contact CTA */}
            <section className="border-t border-border bg-gradient-to-b from-secondary/40 to-background">
              <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16 card-elevated">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none mask-fade-bottom" />
                  <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/20 blur-3xl pointer-events-none" />

                  <div className="relative max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      Let's work together
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                      Have a project in mind?
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      I'm available for select freelance opportunities. Whether it's data, AI, or full-stack -
                      let's turn your idea into something tangible.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Mail, label: 'Email', value: 'bryan.chengze@gmail.com', href: 'mailto:bryan.chengze@gmail.com' },
                        { icon: Github, label: 'GitHub', value: 'github.com/bryan-cheng-hengze', href: 'https://github.com/bryan-cheng-hengze' },
                        { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/bryan-cheng-hengze', href: 'https://linkedin.com/in/bryan-cheng-hengze' },
                        { icon: Twitter, label: 'X', value: 'x.com/bryanchengze', href: 'https://x.com/bryanchengze' },
                      ].map(({ icon: Icon, label, value, href }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-3 rounded-xl border border-border bg-background/60 backdrop-blur px-4 py-3.5 hover:border-brand/40 hover:bg-background transition-all"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
                            <div className="text-sm font-medium truncate">{value}</div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default HomePage
