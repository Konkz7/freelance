import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-base text-fg transition-[color,box-shadow,border-color] outline-none md:text-sm',
        'placeholder:text-fg-subtle',
        'file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg',
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

export { Input }
