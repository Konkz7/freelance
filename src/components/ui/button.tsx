import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-px",
  {
    variants: {
      variant: {
        /** Primary call to action — warm white on near-black. */
        default:
          'bg-fg text-background shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:bg-white',
        /** Secondary action — hairline outline that fills on hover. */
        outline:
          'border border-[#3c3c46] bg-transparent text-fg hover:border-fg-subtle hover:bg-surface-2',
        secondary: 'bg-surface-2 text-fg hover:bg-[#1e1e22]',
        ghost: 'text-fg-muted hover:bg-surface-2 hover:text-fg',
        link: 'text-fg underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-110',
      },
      size: {
        sm: 'h-9 px-4 has-[>svg]:px-3.5',
        default: 'h-11 px-6 has-[>svg]:px-5',
        lg: 'h-12 px-7 text-[0.9375rem] has-[>svg]:px-6',
        icon: 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
