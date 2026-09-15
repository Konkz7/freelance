import { ArrowUp } from 'lucide-react'

import { Wordmark } from '@/components/Wordmark'
import { navItems, site } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a href="#top" className="group inline-flex" aria-label="Back to top">
              <Wordmark />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.role} in {site.location}, building Android, web, Unity and
              backend software for clients.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  Start a project
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {site.links.map((link) => {
                const external = link.href.startsWith('http')
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      className="group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <link.icon className="size-3.5 transition-colors group-hover:text-gold" />
                      <span className="underline-offset-4 group-hover:underline">
                        {link.handle}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            &copy; {year} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-fg-subtle">
              Built with React &amp; TypeScript
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs text-fg-subtle transition-colors hover:text-fg"
            >
              Back to top
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
