import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { ProjectCard } from '@/components/ProjectCard'
import { Accent, SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { projectFilters, projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import type { CategoryFilter } from '@/types'

type FilterId = CategoryFilter['id']

export function Projects() {
  const [filter, setFilter] = useState<FilterId>('all')
  const reduceMotion = useReducedMotion() ?? false

  const counts = useMemo(() => {
    const map = new Map<FilterId, number>([['all', projects.length]])
    for (const project of projects) {
      map.set(project.category, (map.get(project.category) ?? 0) + 1)
    }
    return map
  }, [])

  const featured = useMemo(
    () => projects.find((project) => project.featured),
    [],
  )

  // The featured project gets its own layout while showing everything; once a
  // filter is applied every match is treated equally.
  const gridProjects = useMemo(() => {
    if (filter === 'all') {
      return projects.filter((project) => project.id !== featured?.id)
    }
    return projects.filter((project) => project.category === filter)
  }, [filter, featured])

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-base">
      <div className="container-page py-24 lg:py-32">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <span id="work-heading">
              Things I have <Accent>actually shipped</Accent>.
            </span>
          }
          lead="A sample across mobile, web, games and backend. Each one is here because of what it demonstrates, not because of who it was for."
        />

        {/* Filters */}
        <Reveal delay={0.08}>
          <div
            role="group"
            aria-label="Filter projects by type"
            className="mt-10 flex flex-wrap gap-2"
          >
            {projectFilters.map((option) => {
              const isActive = filter === option.id
              const count = counts.get(option.id) ?? 0

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                    isActive
                      ? 'border-fg bg-fg text-background'
                      : 'border-line-strong text-fg-muted hover:border-fg-subtle hover:text-fg',
                  )}
                >
                  {option.label}
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem]',
                      isActive ? 'text-background/60' : 'text-fg-subtle',
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Featured project */}
        {filter === 'all' && featured && (
          <Reveal delay={0.12} className="mt-14 lg:mt-16">
            <ProjectCard project={featured} variant="featured" />
          </Reveal>
        )}

        {/* Remaining projects */}
        <motion.div
          layout={!reduceMotion}
          className={cn(
            'grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2',
            filter === 'all' && featured
              ? 'mt-16 border-t border-line pt-16'
              : 'mt-14',
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {gridProjects.map((project) => (
              <motion.div
                key={project.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {gridProjects.length === 0 && (
          <p className="mt-14 text-sm text-fg-muted">
            Nothing listed here yet &mdash; but it is well within what I take
            on. <a href="#contact" className="text-fg underline underline-offset-4 hover:text-gold">Ask me about it</a>.
          </p>
        )}

        {/* Section-closing CTA */}
        <Reveal className="mt-20 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-fg-muted">
            Something like this in mind?
          </p>
          <Button asChild variant="outline">
            <a href="#contact">
              Tell me about your project
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
