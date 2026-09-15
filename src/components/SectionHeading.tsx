import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/Reveal'

/**
 * The serif italic used to lift one phrase out of a heading. Used sparingly —
 * once per heading at most.
 */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif font-normal italic tracking-[-0.01em] text-gold">
      {children}
    </span>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  className?: string
  /** Renders the heading at h1 size. Only the hero should need this. */
  level?: 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  level = 'h2',
}: SectionHeadingProps) {
  const Heading = level

  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className="eyebrow flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="inline-block h-px w-6 bg-line-strong"
        />
        {eyebrow}
      </p>
      <Heading className="mt-5 text-[2rem] leading-[1.1] font-medium text-fg sm:text-[2.5rem] lg:text-[2.875rem]">
        {title}
      </Heading>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </Reveal>
  )
}
