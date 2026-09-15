import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger successive items by ~60ms each. */
  delay?: number
  /** Travel distance in pixels. Kept small — this should be barely noticed. */
  y?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

/**
 * Fades content in as it enters the viewport, once. Anyone who has asked for
 * reduced motion gets the content immediately with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion() ?? false
  const Component = motion[as]

  if (reduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  )
}
