import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown, School, Briefcase, BriefcaseBusiness, Calendar,
  ChevronsUp, CheckCircle2, TrendingUp, Award, Trophy
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { events } from "@/data/events"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

const getIcon = (iconType: 'promotion' | 'award' | 'achievement' | 'advanced' | 'work' | 'school') => {
  switch (iconType) {
    case 'promotion': return TrendingUp
    case 'award': return Award
    case 'achievement': return Trophy
    case 'work': return BriefcaseBusiness
    case 'school': return School
    default: return ChevronsUp
  }
}

export default function VerticalEventTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else {
      setExpandedIndex(null)
      const timer = setTimeout(() => {
        setExpandedIndex(index)
        clearTimeout(timer)
      }, 250)
    }
  }

  return (
    <div className="mx-auto px-5 sm:px-8 w-full max-w-5xl">
      <div className="text-center mb-14 sm:mb-16">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.18em] text-brand"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          My journey
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Milestones & growth
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Key milestones, achievements, and experiences shaping my career.
        </motion.p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent z-0" />

        {events.map((item, index) => {
          const IconComponent = getIcon(item.iconType)
          const isExpanded = expandedIndex === index
          return (
            <motion.div
              key={index}
              className={`mb-8 sm:mb-10 relative z-10 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
            >
              {/* Timeline dot */}
              <div className="absolute left-3 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-background border-2 border-brand shadow-sm" />
                {isExpanded && (
                  <div className="absolute w-4 h-4 rounded-full bg-brand/30 animate-ping" />
                )}
              </div>

              {/* Date badge */}
              <div
                className={`md:w-1/2 flex ${
                  index % 2 === 0
                    ? "md:justify-end md:pr-10"
                    : "md:justify-start md:pl-10"
                }`}
              >
                <div className="mb-3 md:mb-0 ml-8 md:ml-0">
                  <Badge
                    variant="outline"
                    className="text-xs sm:text-sm py-1.5 px-3 bg-card border-border font-medium"
                  >
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" />
                    {item.date}
                  </Badge>
                </div>
              </div>

              {/* Card */}
              <div
                className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
              >
                <motion.div layout className="w-full">
                  <Card className={`overflow-hidden border-border transition-all duration-300 card-elevated ${
                    isExpanded ? 'border-brand/30 shadow-lg' : 'hover:border-brand/20'
                  }`}>
                    <CardContent className="p-0">
                      <button
                        type="button"
                        className="w-full text-left p-5 sm:p-6 cursor-pointer flex justify-between items-start gap-3"
                        onClick={() => toggleExpand(index)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-soft text-brand flex-shrink-0">
                              <IconComponent className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
                              {item.description}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                            {item.extendedDescription}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/60">
                              <h4 className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mt-4 mb-3 flex items-center gap-1.5">
                                <Briefcase className="w-3 h-3" />
                                Highlights
                              </h4>
                              <ul className="space-y-2">
                                {item.events.map((event, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.05 }}
                                  >
                                    <CheckCircle2
                                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                        event.isChecked ? "text-brand" : "text-muted-foreground"
                                      }`}
                                    />
                                    <span className="text-sm leading-snug">{event.title}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/journey">
          <Button variant="outline" className="rounded-full gap-2">
            Full journey <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
