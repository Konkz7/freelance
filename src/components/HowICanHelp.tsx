import { ArrowRight, Check } from 'lucide-react'

import { Accent, SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { situations } from '@/data/situations'

export function HowICanHelp() {
  return (
    <section
      id="how-i-help"
      aria-labelledby="how-i-help-heading"
      className="border-t border-line bg-surface/30"
    >
      <div className="container-page py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="How I can help"
                title={
                  <span id="how-i-help-heading">
                    Wherever you are <Accent>starting from</Accent>.
                  </span>
                }
                lead="Most people arrive in one of four situations. Find yours."
              />

              <Reveal delay={0.1}>
                <Button asChild className="mt-8 hidden lg:inline-flex">
                  <a href="#contact">
                    Start a project
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {situations.map((situation, index) => (
                <Reveal
                  as="li"
                  key={situation.id}
                  delay={Math.min(index, 3) * 0.06}
                  className="group border-b border-line py-8 first:pt-9 lg:py-10"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 hidden size-10 shrink-0 place-items-center rounded-lg border border-line-strong bg-base text-fg-muted transition-colors duration-300 group-hover:border-gold/40 group-hover:text-gold sm:grid">
                      <situation.icon className="size-[1.125rem]" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl leading-tight font-normal text-fg italic sm:text-[1.75rem]">
                        {situation.question}
                      </h3>

                      <p className="mt-3.5 leading-relaxed text-fg-muted">
                        {situation.answer}
                      </p>

                      <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-x-7">
                        {situation.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex items-center gap-2 text-sm text-fg-subtle"
                          >
                            <Check
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-gold/80"
                            />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-10 lg:hidden">
              <Button asChild className="w-full sm:w-auto">
                <a href="#contact">
                  Start a project
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
