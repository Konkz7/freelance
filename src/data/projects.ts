import type { CategoryFilter, Project, ProjectCategory } from '@/types'

/* ===========================================================================
 * Selected work — drawn from github.com/Konkz7
 * ===========================================================================
 * Copy below is written from what is actually in each repository. The only
 * thing still outstanding is MEDIA: each entry points at a hand-drawn SVG
 * placeholder at `public/projects/<id>.svg`, sketched to match that project.
 * To make one real, drop a screenshot in beside it and change `media.src` —
 * nothing else moves.
 *
 * Two of these already have screenshots committed in their own repos:
 *   Possessed     → Unity-Possessed-Platformer/screenshots (6 images)
 *   Chess-Engine  → Chess-Engine/screenshots (2 images)
 *
 * Media renders in a fixed 16:10 frame with object-cover; roughly 1600x1000
 * is ideal. For motion use `kind: 'video'` with an MP4 and an optional poster.
 *
 * Exactly one project carries `featured: true` and gets the large layout.
 * ======================================================================== */

export const projects: Project[] = [
  {
    id: 'betsocial',
    title: 'BetSocial',
    category: 'mobile',
    year: '2025—26',
    featured: true,
    summary:
      'A social prediction platform where people create challenges, message each other and settle outcomes together — mobile client and backend built as one product.',
    demonstrates:
      'A finished product rather than a demo: real-time messaging over WebSocket, Firebase authentication and push, a Postgres schema managed by Flyway migrations, backend tests running in CI, and a Docker Compose and Caddy setup for deployment.',
    tech: [
      'React Native',
      'TypeScript',
      'Java 21',
      'Spring Boot',
      'PostgreSQL',
      'WebSocket',
      'Firebase',
      'Docker',
    ],
    media: {
      kind: 'image',
      // TODO: replace with a real BetSocial screenshot.
      src: '/projects/betsocial.svg',
      alt: 'BetSocial mobile app showing a feed of prediction challenges and group messaging',
    },
    links: [{ label: 'View on GitHub', href: 'https://github.com/Konkz7/BetSocial' }],
  },
  {
    id: 'whistleblower',
    title: 'KPMG whistleblower app',
    category: 'mobile',
    year: '2025',
    role: 'Client project',
    summary:
      'A Flutter app built for KPMG so staff can raise concerns anonymously, with in-app voice and video when a report needs escalating.',
    demonstrates:
      'Sensitive workflows handled carefully — anonymity preserved through the reporting flow, Agora voice and video backed by a Go token service I wrote alongside it, push notifications, and a layered MVVM structure that keeps screens testable.',
    tech: ['Flutter', 'Dart', 'Stacked MVVM', 'Agora RTC', 'OneSignal', 'Go'],
    media: {
      kind: 'image',
      // TODO: replace with a real screenshot — check with KPMG before showing
      // anything that includes their branding or real report content.
      src: '/projects/whistleblower.svg',
      alt: 'KPMG whistleblower app showing an anonymous report submission screen and secure call escalation',
    },
    // Client work in a private repository, so no public link.
  },
  {
    id: 'flowstate',
    title: 'FlowState',
    category: 'web',
    year: '2026',
    role: 'Contributor · 13 merged PRs',
    summary:
      'A Blazor productivity app for planning work and staying accountable to it — I joined the team and built out a large part of the product.',
    demonstrates:
      'Feature work in someone else’s codebase, delivered ticket by ticket: the task model and data layer, the dashboard and task list, an Eisenhower prioritisation matrix, and full CRUD for focus sessions with invites — each one reviewed and merged.',
    tech: ['C#', 'ASP.NET Core', 'Blazor', 'EF Core', 'xUnit'],
    media: {
      kind: 'image',
      // TODO: replace with a screenshot of the dashboard or Eisenhower matrix.
      src: '/projects/flowstate.svg',
      alt: 'FlowState dashboard showing a task list, an Eisenhower priority matrix and focus sessions',
    },
    links: [
      { label: 'View on GitHub', href: 'https://github.com/Yosefgid/FlowState' },
    ],
  },
  {
    id: 'health-passport',
    title: 'Personal Health Passport',
    category: 'backend',
    year: '2026',
    role: 'Contributor',
    summary:
      'A privacy-first health record that turns unstructured clinical notes into structured, patient-readable information — all processed locally.',
    demonstrates:
      'The parts a product cannot ship without: JWT authentication end to end, email verification and password reset, clinical-entity CRUD behind proper authorisation, and a Python NLP microservice wired into the .NET backend over its own API.',
    tech: ['C#', 'ASP.NET Core', 'Blazor', 'JWT', 'Python', 'SQL Server'],
    media: {
      kind: 'image',
      // TODO: replace with a screenshot of the entity extraction or dashboard.
      src: '/projects/health-passport.svg',
      alt: 'Personal Health Passport showing clinical notes with extracted medical entities and a plain-English summary',
    },
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/michh18/personal-health-passport',
      },
    ],
  },
  {
    id: 'possessed',
    title: 'Possessed',
    category: 'unity',
    year: '2025—26',
    summary:
      'A 2D Unity platformer set against climate collapse — precision movement, parry-based combat and an aerial boss fight.',
    demonstrates:
      'Game feel built on purpose: momentum-based movement, directional attacks and parries, several distinct enemy behaviours, custom shaders, and a separate boss encounter scene.',
    tech: ['Unity', 'C#', 'ShaderLab', 'HLSL', 'TextMesh Pro'],
    media: {
      kind: 'image',
      // TODO: the repo already has 6 screenshots in /screenshots — use one of those.
      src: '/projects/possessed.svg',
      alt: 'Possessed gameplay showing 2D platforming combat against a corrupted enemy',
    },
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/Konkz7/Unity-Possessed-Platformer',
      },
    ],
  },
  {
    id: 'recordshop',
    title: 'Record Shop API',
    category: 'backend',
    year: '2026',
    summary:
      'A catalogue and stock API for a record shop, built in ASP.NET Core with a clean controller, service and repository split.',
    demonstrates:
      'Backend structure that stays maintainable as it grows — schema changes tracked as EF Core migrations, a health endpoint for monitoring, and separate development and production configuration rather than one file with switches.',
    tech: ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'REST'],
    media: {
      kind: 'image',
      // TODO: replace with an API/architecture diagram or a request walkthrough.
      src: '/projects/recordshop.svg',
      alt: 'Record Shop API architecture showing controller, service and repository layers',
    },
    links: [
      { label: 'View on GitHub', href: 'https://github.com/Konkz7/RecordShop' },
    ],
  },
  {
    id: 'chess-engine',
    title: 'Chess engine',
    category: 'systems',
    year: '2025—26',
    summary:
      'A Java chess engine with a playable interface and two competing AI approaches that can be run against each other.',
    demonstrates:
      'Algorithmic depth and correctness under pressure — minimax with alpha-beta pruning alongside a Monte Carlo Tree Search agent, multi-threaded move generation, and full rule coverage including castling, en passant, promotion and draw-by-repetition.',
    tech: ['Java', 'Minimax', 'Alpha-beta pruning', 'MCTS', 'Multithreading'],
    media: {
      kind: 'image',
      // TODO: the repo already has 2 screenshots in /screenshots — use one of those.
      src: '/projects/chess-engine.svg',
      alt: 'Chess engine interface showing a board mid-game with the AI evaluating a move',
    },
    links: [
      { label: 'View on GitHub', href: 'https://github.com/Konkz7/Chess-Engine' },
    ],
  },
  {
    id: 'music-player',
    title: 'Android music player',
    category: 'mobile',
    year: '2025',
    summary:
      'A native Android player that reads audio straight off the device — browse a library, play a track, adjust playback settings.',
    demonstrates:
      'Native Android without a cross-platform framework in between: multiple activities, a browsable track list with a custom row layout, a dedicated playback screen, and reading media from device storage.',
    tech: ['Java', 'Android SDK', 'Gradle', 'XML layouts'],
    media: {
      kind: 'image',
      // TODO: replace with a screenshot of the player and library screens.
      src: '/projects/music-player.svg',
      alt: 'Android music player showing a track library and the playback screen',
    },
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/Konkz7/Android-Music-Player',
      },
    ],
  },
]

/** Human-readable labels for a project's category badge. */
export const categoryLabels: Record<ProjectCategory, string> = {
  mobile: 'Mobile app',
  web: 'Web application',
  unity: 'Unity / game',
  backend: 'Backend & API',
  systems: 'Systems & AI',
}

/** The order categories appear in, when present. */
const FILTER_ORDER: ProjectCategory[] = [
  'mobile',
  'web',
  'backend',
  'unity',
  'systems',
]

/** Short labels for the filter row — deliberately terser than the badges. */
const FILTER_LABELS: Record<ProjectCategory, string> = {
  mobile: 'Mobile',
  web: 'Web',
  backend: 'Backend',
  unity: 'Unity',
  systems: 'Systems & AI',
}

/**
 * Filters are derived from the projects above, so a category only appears
 * once something belongs to it. Add a web project and the Web tab shows up on
 * its own — there is no second list to keep in sync.
 */
export const projectFilters: CategoryFilter[] = [
  { id: 'all', label: 'All work' },
  ...FILTER_ORDER.filter((category) =>
    projects.some((project) => project.category === category),
  ).map((category) => ({ id: category, label: FILTER_LABELS[category] })),
]
