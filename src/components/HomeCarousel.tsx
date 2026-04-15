import { ChevronRight, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from './ui/carousel'
import SkeletonImage from './ui/skeleton_img'

interface HomeCarouselProps<T> {
  title: string
  description: string
  data: T[]
  cardWidth?: number
  gap?: number
  showCount?: boolean
  count?: number
  exploreLink?: string
}

interface CardItem {
  name: string
  category: string
  url?: string
  image: string
  isInversed?: boolean
}

const renderCard = (
  item: CardItem,
  index: number,
  loadingStates: boolean[],
  setLoadingStates: React.Dispatch<React.SetStateAction<boolean[]>>,
) => {
  const hasUrl = !!item.url
  const cardClasses = "block w-full h-64 sm:h-72 md:h-80 relative group overflow-hidden rounded-2xl border border-border/50 bg-card card-elevated"
  const inner = (
    <>
      <SkeletonImage
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06] select-none image-smooth"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
        onLoadingChange={(loading) => {
          setLoadingStates((prev) => {
            const newState = [...prev]
            newState[index] = loading
            return newState
          })
        }}
      />

      {/* Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />

      {!loadingStates[index] && (
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 z-20">
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/70">
                {item.category}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                {item.name || '\u00A0'}
              </h3>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition-colors duration-300 flex-shrink-0 border border-white/10">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}
    </>
  )

  if (hasUrl) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={cardClasses}>
        {inner}
      </a>
    )
  }
  return <div className={cardClasses}>{inner}</div>
}

const renderExploreCard = (exploreLink?: string) => {
  const isInternalLink = exploreLink?.startsWith('/')
  const body = (
    <>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-transparent" />
      <div className="relative flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-soft flex items-center justify-center ring-1 ring-brand/20 mb-4">
          <ChevronRight className="w-6 h-6 text-brand" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">Explore more</h3>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-[200px]">
          See the full list.
        </p>
      </div>
    </>
  )

  const cls = "w-full h-64 sm:h-72 md:h-80 relative overflow-hidden rounded-2xl bg-card border border-border/60 transition-all hover:border-brand/40 card-elevated"

  if (exploreLink) {
    return isInternalLink ? (
      <Link to={exploreLink} className={cls}>{body}</Link>
    ) : (
      <a href={exploreLink} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
    )
  }
  return <div className={cls}>{body}</div>
}

const HomeCarousel = <T,>({
  title,
  description,
  data,
  cardWidth = 320,
  gap = 24,
  showCount = true,
  count,
  exploreLink,
}: HomeCarouselProps<T>) => {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(data.length).fill(true),
  )

  return (
    <Carousel
      title={title}
      description={description}
      data={data}
      renderCard={(item, index) => renderCard(item as unknown as CardItem, index, loadingStates, setLoadingStates)}
      renderExploreCard={() => renderExploreCard(exploreLink)}
      cardWidth={cardWidth}
      gap={gap}
      showCount={showCount}
      count={count}
    />
  )
}

export default HomeCarousel
