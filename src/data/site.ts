import { Globe, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/BrandIcons'
import type { NavItem, SiteConfig } from '@/types'

/* ===========================================================================
 * YOUR DETAILS — edit this file first.
 * ===========================================================================
 * Everything below appears across the hero, contact block and footer. The
 * lines marked TODO are placeholders and will 404 until you replace them.
 * ======================================================================== */

export const site: SiteConfig = {
  name: 'Amara Okonkwo',
  role: 'Independent software developer',
  location: 'London, UK',

  // TODO: swap in a dedicated work address if you would rather not publish
  // your personal one.
  email: 'amara03@live.co.uk',

  url: 'https://konkz7.github.io/freelance/',

  availability: {
    open: true,
    label: 'Available for new projects',
  },

  // Cropped to 4:5 around the centre. `public/portrait.svg` is the old
  // placeholder, kept only as a fallback if you ever swap the photo out.
  portrait: {
    src: '/portrait.jpeg',
    alt: 'Amara Okonkwo, independent software developer, photographed head and shoulders',
  },

  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/Konkz7',
      handle: 'github.com/Konkz7',
      icon: GithubIcon,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/amara-okonkwo-19249435b',
      handle: 'linkedin.com/in/amara-okonkwo',
      icon: LinkedinIcon,
    },
    {
      label: 'Portfolio',
      href: 'https://konkz7.github.io/portfolio/',
      handle: 'konkz7.github.io/portfolio',
      icon: Globe,
    },
    {
      label: 'Email',
      href: 'mailto:amara03@live.co.uk',
      handle: 'amara03@live.co.uk',
      icon: Mail,
    },
  ],
}

/** Sections offered in the header and footer navigation. */
export const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'How I help', href: '#how-i-help' },
  { label: 'About', href: '#about' },
]

/** Disciplines listed in the strip beneath the hero. */
export const capabilities: string[] = [
  'Android',
  'Web apps',
  'Unity',
  'APIs & microservices',
  'Feature work',
  'Code audits',
]
