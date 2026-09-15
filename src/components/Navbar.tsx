import { useMemo, useState } from 'react'
import { ArrowRight, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Wordmark } from '@/components/Wordmark'
import { navItems, site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)

  const sectionIds = useMemo(
    () =>
      ['top']
        .concat(navItems.map((item) => item.href.replace('#', '')))
        .concat('contact'),
    [],
  )
  const active = useActiveSection(sectionIds)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-line bg-base/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]"
      >
        <a
          href="#top"
          className="group -m-2 rounded-lg p-2"
          aria-label={`${site.name} — back to top`}
        >
          <Wordmark />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '')
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                    isActive
                      ? 'text-fg'
                      : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">
              Start a project
              <ArrowRight className="size-3.5" />
            </a>
          </Button>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-0">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section, or start a project enquiry.
              </SheetDescription>

              <div className="flex h-16 items-center border-b border-line px-5">
                <Wordmark />
              </div>

              <ul className="flex flex-col px-3 py-4">
                {navItems.map((item) => {
                  const isActive = active === item.href.replace('#', '')
                  return (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <a
                          href={item.href}
                          aria-current={isActive ? 'true' : undefined}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-3 py-3.5 text-lg font-medium transition-colors',
                            isActive
                              ? 'bg-surface text-fg'
                              : 'text-fg-muted hover:bg-surface hover:text-fg',
                          )}
                        >
                          {item.label}
                          <ArrowRight
                            className={cn(
                              'size-4 transition-opacity',
                              isActive
                                ? 'text-gold opacity-100'
                                : 'opacity-40',
                            )}
                          />
                        </a>
                      </SheetClose>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto border-t border-line p-5">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <a href="#contact">
                      Start a project
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </SheetClose>

                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {site.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          link.href.startsWith('http')
                            ? 'noreferrer noopener'
                            : undefined
                        }
                        className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        <link.icon className="size-3.5" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
