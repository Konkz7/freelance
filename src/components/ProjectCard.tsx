import { ArrowUpRight } from 'lucide-react'

import { ProjectMedia } from '@/components/ProjectMedia'
import { categoryLabels } from '@/data/projects'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-fg-subtle"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links?.length) return null

  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
      {project.links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={
              link.href.startsWith('http') ? 'noreferrer noopener' : undefined
            }
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-gold"
          >
            {link.label}
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  )
}

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'featured'
}

export function ProjectCard({
  project,
  variant = 'default',
}: ProjectCardProps) {
  const meta = (
    <p className="eyebrow flex flex-wrap items-center gap-2">
      <span className="text-gold">{categoryLabels[project.category]}</span>
      <span aria-hidden="true" className="text-line-strong">
        /
      </span>
      <span>{project.year}</span>
      {project.role && (
        <>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <span className="text-fg-muted">{project.role}</span>
        </>
      )}
    </p>
  )

  if (variant === 'featured') {
    return (
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line transition-colors duration-500 group-hover:border-line-strong">
            <ProjectMedia media={project.media} priority />
          </div>
        </div>

        <div className="lg:col-span-5">
          {meta}

          <h3 className="mt-4 text-2xl font-medium text-fg sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          <p className="mt-5 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-fg-subtle">
            {project.demonstrates}
          </p>

          <div className="mt-6">
            <TechTags tech={project.tech} />
          </div>

          <ProjectLinks project={project} />
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col">
      <div
        className={cn(
          'overflow-hidden rounded-xl border border-line transition-colors duration-500 group-hover:border-line-strong',
        )}
      >
        <ProjectMedia media={project.media} />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        {meta}

        <h3 className="mt-3 text-xl font-medium text-fg">{project.title}</h3>

        <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-fg-subtle">
          {project.demonstrates}
        </p>

        <div className="mt-5 pt-1">
          <TechTags tech={project.tech} />
        </div>

        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
