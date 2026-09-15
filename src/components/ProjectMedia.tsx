import { useReducedMotion } from 'framer-motion'

import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'
import type { ProjectMedia as ProjectMediaType } from '@/types'

interface ProjectMediaProps {
  media: ProjectMediaType
  className?: string
  /** The featured project is above the fold on tall screens — load it eagerly. */
  priority?: boolean
}

/**
 * Renders project media in a consistent 16:10 frame. Images lazy-load;
 * videos autoplay silently unless the visitor has asked for reduced motion,
 * in which case they get ordinary playback controls instead.
 */
export function ProjectMedia({
  media,
  className,
  priority = false,
}: ProjectMediaProps) {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div
      className={cn(
        'relative aspect-16/10 w-full overflow-hidden bg-surface',
        className,
      )}
    >
      {media.kind === 'image' ? (
        <img
          src={asset(media.src)}
          alt={media.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <video
          src={asset(media.src)}
          poster={media.poster ? asset(media.poster) : undefined}
          aria-label={media.alt}
          muted
          playsInline
          loop={!reduceMotion}
          autoPlay={!reduceMotion}
          controls={reduceMotion}
          preload={priority ? 'auto' : 'metadata'}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  )
}
