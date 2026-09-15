import { ContactForm } from '@/components/ContactForm'
import { Accent, SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { whatHappensNext } from '@/data/enquiry-options'
import { site } from '@/data/site'

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate border-t border-line bg-surface/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden"
      >
        <div className="absolute top-[-20rem] left-1/2 h-[34rem] w-[min(60rem,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(237,180,88,0.08),transparent)]" />
      </div>

      <div className="container-page py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Start a project"
              title={
                <span id="contact-heading">
                  Tell me what you are <Accent>trying to build</Accent>.
                </span>
              }
              lead="A couple of paragraphs is plenty. If it is still half-formed, say so — working that out is part of the job."
            />

            <Reveal delay={0.08}>
              <ol className="mt-10 space-y-4">
                {whatHappensNext.map((step, index) => (
                  <li key={step} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-base font-mono text-[0.6875rem] text-fg-subtle"
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 border-t border-line pt-8">
                <h3 className="eyebrow">Or reach me directly</h3>

                <ul className="mt-5 space-y-1">
                  {site.links.map((link) => {
                    const external = link.href.startsWith('http')
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer noopener' : undefined}
                          className="group -mx-3 flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line-strong bg-base text-fg-muted transition-colors group-hover:border-gold/40 group-hover:text-gold">
                            <link.icon className="size-3.5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-fg">
                              {link.label}
                            </span>
                            <span className="block truncate font-mono text-xs text-fg-subtle">
                              {link.handle}
                            </span>
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
