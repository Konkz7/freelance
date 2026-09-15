import { FileSearch, Lightbulb, Plug, Wrench } from 'lucide-react'
import type { Situation } from '@/types'

/**
 * "How I can help" — written from the client's starting position rather than
 * as a list of technologies.
 */
export const situations: Situation[] = [
  {
    id: 'idea',
    icon: Lightbulb,
    question: 'You have an idea',
    answer:
      'We start by working out the smallest version that proves it, then build that properly. You get something real in front of users early instead of a specification that keeps growing.',
    outcomes: [
      'Scope shaped into a first release',
      'Working application, not a prototype you throw away',
      'Deployed and usable at the end of it',
    ],
  },
  {
    id: 'existing',
    icon: Wrench,
    question: 'You already have an application',
    answer:
      'I pick up an existing codebase, learn how it is put together, and ship the features you need next. Bugs that have been sitting there get fixed on the way through.',
    outcomes: [
      'New features in your existing stack',
      'Long-standing bugs cleared',
      'Changes reviewed and documented',
    ],
  },
  {
    id: 'legacy',
    icon: FileSearch,
    question: 'You inherited a messy codebase',
    answer:
      'I review the architecture, security and dependencies, then tell you plainly what is fine, what is risky and what it would cost to fix — before you commit to a rewrite you may not need.',
    outcomes: [
      'Prioritised written findings',
      'Security and dependency risks identified',
      'A realistic plan, rewrite or not',
    ],
  },
  {
    id: 'backend',
    icon: Plug,
    question: 'You need a backend',
    answer:
      'I build the API or service your app talks to — data model, authentication, deployment and documentation — and make sure it integrates cleanly with what you already have.',
    outcomes: [
      'Documented, versioned API',
      'Authentication handled properly',
      'Integrated with your existing client',
    ],
  },
]
