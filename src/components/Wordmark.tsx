import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface WordmarkProps {
  className?: string
  /** Hides the name and shows only the mark — used in tight spaces. */
  markOnly?: boolean
}

export function Wordmark({ className, markOnly = false }: WordmarkProps) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="relative grid size-7 shrink-0 place-items-center rounded-[7px] border border-line-strong bg-surface transition-colors duration-300 group-hover:border-gold/50"
      >
        <span className="size-2 rotate-45 rounded-[1.5px] bg-gold transition-transform duration-300 group-hover:rotate-[135deg]" />
      </span>
      {!markOnly && (
        <span className="text-[0.9375rem] font-medium tracking-tight text-fg">
          {site.name}
        </span>
      )}
    </span>
  )
}
