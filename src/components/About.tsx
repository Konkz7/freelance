import { Accent, SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { aboutFacts, aboutParagraphs } from '@/data/about'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="container-page py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title={
                <span id="about-heading">
                  Independent, and <Accent>hands-on</Accent>.
                </span>
              }
            />

            <div className="mt-7 max-w-2xl space-y-5">
              {aboutParagraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06}>
                  <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <dl className="border-t border-line">
                {aboutFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <dt className="eyebrow shrink-0">{fact.label}</dt>
                    <dd className="text-sm text-fg sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
