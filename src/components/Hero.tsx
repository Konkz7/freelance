import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/Reveal'
import { capabilities, site } from '@/data/site'
import { asset } from '@/lib/asset'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background: a faint technical grid and one soft warm wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(75%_65%_at_50%_0%,black,transparent)] opacity-70" />
        <div className="absolute top-[-28rem] left-1/2 h-[46rem] w-[min(78rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(237,180,88,0.11),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
      </div>

      <div className="container-page pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/60 py-1.5 pr-4 pl-2.5 text-xs text-fg-muted backdrop-blur-sm">
                <span className="relative flex size-2">
                  {site.availability.open && (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60 [animation-duration:2.5s]" />
                  )}
                  <span className="relative inline-flex size-2 rounded-full bg-gold" />
                </span>
                {site.availability.label}
                <span aria-hidden="true" className="text-fg-subtle">
                  ·
                </span>
                {site.location}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-4xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.03em] text-fg sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.6rem]">
                Software built around{' '}
                <span className="font-serif font-normal italic tracking-[-0.015em] text-gold">
                  your idea
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
                I&rsquo;m an independent developer building Android apps, web
                applications, Unity experiences and the backend services behind
                them &mdash; taking a rough idea, or a half-finished codebase,
                and turning it into something your users can actually use.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href="#contact">
                    Start a project
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#work">View my work</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {site.links
                  .filter((link) => link.label !== 'Email')
                  .map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-2 text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
                      >
                        <link.icon className="size-4 transition-colors duration-200 group-hover:text-gold" />
                        <span className="underline-offset-4 group-hover:underline">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(237,180,88,0.13),transparent)]"
              />
              <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/40">
                <img
                  src={asset(site.portrait.src)}
                  alt={site.portrait.alt}
                  width={800}
                  height={1000}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Capability strip */}
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-7">
          <p className="eyebrow shrink-0">What I build</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {capabilities.map((capability, index) => (
              <li
                key={capability}
                className="flex items-center gap-4 text-sm text-fg-muted"
              >
                {capability}
                {index < capabilities.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-3 w-px bg-line-strong sm:block"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
