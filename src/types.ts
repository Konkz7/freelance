import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'

/**
 * Any icon component that accepts a className — covers both Lucide icons and
 * the hand-rolled brand marks in `components/BrandIcons.tsx`.
 */
export type IconComponent = ComponentType<{ className?: string }>

/* -------------------------------------------------------------------------
 * Navigation
 * ---------------------------------------------------------------------- */

export interface NavItem {
  label: string
  /** In-page anchor, e.g. "#services". */
  href: string
}

/* -------------------------------------------------------------------------
 * Site identity
 * ---------------------------------------------------------------------- */

export interface SiteLink {
  label: string
  href: string
  icon: IconComponent
  /** Shown next to the label in the contact block, e.g. "@konkz7". */
  handle: string
}

export interface SiteConfig {
  /** Used in the wordmark, footer and page title. */
  name: string
  /** Short positioning line, e.g. "Independent software developer". */
  role: string
  location: string
  email: string
  /** Absolute URL of the deployed site — used for Open Graph tags. */
  url: string
  availability: {
    open: boolean
    label: string
  }
  /** Hero portrait. Cropped to 4:5, so a centred head-and-shoulders works best. */
  portrait: {
    src: string
    alt: string
  }
  links: SiteLink[]
}

/* -------------------------------------------------------------------------
 * Services
 * ---------------------------------------------------------------------- */

export interface Service {
  id: string
  title: string
  icon: LucideIcon
  /** Two or three sentences on what the work actually involves. */
  description: string
  /** The client-side problem this service solves. */
  solves: string
}

/* -------------------------------------------------------------------------
 * Projects
 * ---------------------------------------------------------------------- */

export type ProjectCategory =
  | 'mobile'
  | 'web'
  | 'unity'
  | 'backend'
  | 'systems'

/**
 * Project media. Swap `src` for a real screenshot, GIF or MP4 in
 * `public/projects/` — nothing else needs to change.
 */
export type ProjectMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string; alt: string }

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  /** Year or range shown as metadata, e.g. "2025". */
  year: string
  /** One line: what it is and who it is for. */
  summary: string
  /** What this piece of work proves about the way I build. */
  demonstrates: string
  /**
   * How I was involved, when it is not simply "I built this" — e.g.
   * "Contributor · 13 merged PRs" or "Client project". Shown in the metadata
   * line. Leave unset for your own solo work.
   */
  role?: string
  tech: string[]
  media: ProjectMedia
  /** Exactly one project should be featured — it gets the large layout. */
  featured?: boolean
  links?: ProjectLink[]
}

export interface CategoryFilter {
  id: ProjectCategory | 'all'
  label: string
}

/* -------------------------------------------------------------------------
 * "How I can help" situations
 * ---------------------------------------------------------------------- */

export interface Situation {
  id: string
  icon: LucideIcon
  /** The client's starting position, phrased as they would say it. */
  question: string
  /** What I do about it. */
  answer: string
  /** Concrete deliverables — keep to three or four short items. */
  outcomes: string[]
}

/* -------------------------------------------------------------------------
 * Enquiry form
 * ---------------------------------------------------------------------- */

export type ProjectType =
  | 'android'
  | 'web'
  | 'unity'
  | 'backend'
  | 'feature'
  | 'audit'
  | 'other'

export interface EnquiryPayload {
  name: string
  email: string
  /** Short answer to "What do you need built?". */
  headline: string
  projectType: ProjectType | ''
  description: string
  budget: string
  timeframe: string
}

export type EnquiryResult =
  | { ok: true; mode: 'endpoint' | 'mailto' }
  | { ok: false; error: string }
