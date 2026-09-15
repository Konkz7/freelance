# CLAUDE.md

Guidance for working in this repository.

## What this site is

A **freelance services site**, not a portfolio or CV. Its job is to convince a
prospective client that the owner can take a software idea, a feature, or an
existing codebase and turn it into a working product. It should read like an
independent developer's studio, not a student portfolio and not a corporate
agency.

Target visitors: individuals, startups, small businesses, and people who
already have a partially built application and need help finishing it.

Services offered: Android apps · web applications · small Unity games and
interactive experiences · backend/API and microservice work · feature
development on existing apps · codebase audits (quality, maintainability,
security).

The primary call to action everywhere is **start a project enquiry**. The
intended journey is Hero → Services → Selected Work → How I Can Help → About →
Contact.

## Stack and constraints

React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · Lucide React ·
Framer Motion.

- **There is intentionally no backend.** Do not add a database, server or API
  for this site. All submission logic lives in `src/lib/enquiry.ts`: with
  `VITE_ENQUIRY_ENDPOINT` set it POSTs to a form provider, and without it hands
  off to a pre-filled `mailto:`. Both paths must keep working — the site is
  deployed statically and the mailto fallback is what makes the form functional
  with no provider configured.
- **Deployed to GitHub Pages under `/freelance/`.** `vite.config.ts` sets
  `base`, and every `public/` path referenced from TypeScript must go through
  `asset()` in `src/lib/asset.ts` — Vite does not rewrite absolute paths in TS,
  so a bare `/projects/x.svg` 404s in production.
- **Do not add libraries without a clear need.** Form validation is hand-rolled
  in `src/lib/validate-enquiry.ts` on purpose — no react-hook-form, no zod.
- Keep the architecture simple and maintainable.
- Lucide v1 removed brand icons; GitHub and LinkedIn marks live in
  `src/components/BrandIcons.tsx`.

## Design direction

Modern, premium, technically credible. Professional, confident, clean,
approachable, independent.

Influences to blend without copying: Linear (typography and spacing), Vercel
(minimal structure), Stripe (polished presentation), Notion (restrained UI,
strong hierarchy).

**Avoid:** excessive gradients, glassmorphism, heavy animation, cards
everywhere, stock photography, cheesy "coding" imagery, neon colours,
complicated navigation, walls of text.

Concretely, in this codebase that means:

- One dark theme. All tokens are CSS variables at the top of `src/index.css`.
- A single amber accent (`--accent`), used sparingly — focus rings, active
  states, section eyebrows, the availability dot. The primary button is warm
  white, never coloured.
- Instrument Serif italic lifts **one** phrase per heading (`<Accent>` in
  `SectionHeading.tsx`). Do not over-use it.
- Services are hairline grid cells with deliberate size variation, not six
  identical floating cards.
- Motion is short fades on scroll only, and must respect
  `prefers-reduced-motion` — both the CSS block in `index.css` and Framer
  Motion's `useReducedMotion()`.

## Engineering conventions

- **Content lives in `src/data/`, never hardcoded in components.** If you add
  something a non-developer might want to edit, put it there and type it in
  `src/types.ts`.
- One component per file in `src/components/`. `App.tsx` only composes
  sections — do not grow it.
- `src/components/ui/` holds vendored shadcn/ui primitives. Treat them as
  third-party: they are exempt from the fast-refresh lint rule, and
  `npx shadcn@latest add <component>` is the way to get more.
- Use the `@/` path alias.
- Semantic HTML, section landmarks with `aria-labelledby`, real labels on form
  controls, visible focus states.
- `tsconfig` has `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`
  and `verbatimModuleSyntax` — use `import type` for types.

Before finishing any change, run:

```bash
npm run build && npm run lint
```

## Placeholder content

`src/data/site.ts` carries `TODO` markers for LinkedIn, portfolio and
`site.url`; `index.html` repeats those URLs for SEO and Open Graph.

The eight entries in `src/data/projects.ts` **are real work**, written from the
repositories the owner built or contributed to — do not rewrite them
speculatively. What is still placeholder is the **media**: each project points
at a hand-drawn SVG at `public/projects/<id>.svg` sketched to match it. Replace
those with real screenshots; `Possessed` and `Chess-Engine` already have
screenshots committed in their own repos.

Three entries are not solo work, and the `role` field on `Project` exists to
say so in the metadata line rather than let the page imply ownership:

- **KPMG whistleblower app** — client work in a private repo. The client is
  named with their agreement; there is no public link, and any screenshot needs
  checking with KPMG before it goes up.
- **FlowState** (`Yosefgid/FlowState`) and **Personal Health Passport**
  (`michh18/personal-health-passport`) — repos owned by other people, where the
  contribution was feature work. Keep the copy about what was contributed, not
  about the whole product.

Keep the services copy consistent with this evidence. The Android work is Java,
React Native and Flutter — not Kotlin or Jetpack Compose. The web work is
Blazor and ASP.NET Core as much as React.
