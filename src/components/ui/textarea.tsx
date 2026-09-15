import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-28 w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-base text-fg transition-[color,box-shadow,border-color] outline-none md:text-sm',
        'placeholder:text-fg-subtle',
        'hover:border-[#3a3a42]',
        'focus-visible:border-gold focus-visible:ring-[3px] focus-visible:ring-gold/25 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/25 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
