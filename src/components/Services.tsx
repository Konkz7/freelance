import { CornerDownRight } from 'lucide-react'

import { Accent, SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

/**
 * Column spans on large screens, by index: two wide cells, then three
 * medium, then one full-width. Kept out of the data so `services.ts` stays
 * pure content — reorder that array and the emphasis follows.
 */
const LG_SPANS = [
  'lg:col-span-6',
  'lg:col-span-6',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-12',
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="container-page py-24 lg:py-32">
        <SectionHeading
          eyebrow="Services"
          title={
            <span id="services-heading">
              What I <Accent>take on</Accent>.
            </span>
          }
          lead="Six kinds of work, whether you are starting from nothing or picking up something that already exists."
        />

        <div className="mt-14 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          {services.map((service, index) => {
            const isWide = index === services.length - 1

            return (
              <Reveal
                key={service.id}
                as="article"
                delay={Math.min(index, 3) * 0.05}
                className={cn(
                  'group relative border-r border-b border-line p-7 transition-colors duration-300 hover:bg-surface/70 lg:p-8',
                  LG_SPANS[index] ?? 'lg:col-span-4',
                  isWide && 'lg:flex lg:items-start lg:gap-12',
                )}
              >
                {/* Hairline that draws in along the top edge on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />

                <div
                  className={cn(
                    isWide &&
                      'lg:flex lg:w-5/12 lg:shrink-0 lg:items-center lg:gap-4',
                  )}
                >
                  <span className="inline-grid size-10 place-items-center rounded-lg border border-line-strong bg-surface text-fg-muted transition-colors duration-300 group-hover:border-gold/40 group-hover:text-gold">
                    <service.icon className="size-[1.125rem]" />
                  </span>

                  <h3
                    className={cn(
                      'mt-5 text-lg font-medium text-fg',
                      isWide && 'lg:mt-0',
                    )}
                  >
                    {service.title}
                  </h3>
                </div>

                <div className={cn(isWide && 'mt-5 lg:mt-0 lg:flex-1')}>
                  <p
                    className={cn(
                      'mt-3 text-sm leading-relaxed text-fg-muted',
                      isWide && 'lg:mt-0',
                    )}
                  >
                    {service.description}
                  </p>

                  <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-4 text-sm text-fg-subtle">
                    <CornerDownRight
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-gold/70"
                    />
                    <span>{service.solves}</span>
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
