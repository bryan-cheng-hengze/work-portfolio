import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps<T> {
  title: string
  description: string
  data: T[]
  renderCard: (item: T, index: number) => React.ReactNode
  renderExploreCard?: () => React.ReactNode
  cardWidth?: number
  gap?: number
  showCount?: boolean
  count?: number
  className?: string
}

const Carousel = <T,>({
  title,
  description,
  data,
  renderCard,
  renderExploreCard,
  cardWidth = 320,
  gap = 24,
  showCount = true,
  count,
  className = "",
}: CarouselProps<T>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = cardWidth + gap

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      if (scrollLeft === 0) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' })
      } else {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">{title}</h2>
            {showCount && (
              <span className="inline-flex items-center text-xs font-medium text-brand bg-brand-soft rounded-full px-2.5 py-1">
                {count !== undefined ? count : data.length}+
              </span>
            )}
          </div>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
            {description}
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer bg-card border border-border text-foreground hover:border-brand/40 hover:bg-brand-soft hover:text-brand active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer bg-card border border-border text-foreground hover:border-brand/40 hover:bg-brand-soft hover:text-brand active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: `${gap}px`, touchAction: 'pan-x pan-y' }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start"
            style={{ width: `min(${cardWidth}px, calc(100vw - 3rem))` }}
          >
            {renderCard(item, index)}
          </div>
        ))}

        {renderExploreCard && (
          <div
            className="flex-shrink-0 snap-start"
            style={{ width: `min(${cardWidth}px, calc(100vw - 3rem))` }}
          >
            {renderExploreCard()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Carousel
