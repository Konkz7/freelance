# Freelance software development site

A single-page marketing site for an independent software developer. Built to
convince a prospective client that an idea, a feature, or an existing codebase
can be turned into working software.

React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · Lucide · Framer Motion.
No backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
```

---

## Edit your content here first

Almost everything on the page comes from `src/data/`. You should rarely need to
open a component to change copy.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | **Start here.** Name, role, location, email, social links, nav items, the capability strip |
| `src/data/services.ts` | The six services and the problem each one solves |
| `src/data/projects.ts` | Selected work, filters, category labels |
| `src/data/situations.ts` | The "How I can help" scenarios |
| `src/data/about.ts` | About paragraphs and the facts list |
| `src/data/enquiry-options.ts` | Project type, budget and timeframe options; "what happens next" |

### Placeholders you must replace

`src/data/site.ts` is marked with `TODO` comments:

- **LinkedIn** and **Portfolio** URLs are placeholders and will 404.
- **GitHub** is set to `github.com/Konkz7` — confirm that is right.
- **Email** uses your personal address; swap it if you want a work address.
- **`site.url`** is `https://example.com` and is used for Open Graph tags.
- **`site.portrait`** points at a placeholder. Save your photo as
  `public/portrait.jpg` and change `src` to `/portrait.jpg`. It renders in a
  4:5 frame cropped around the centre, so a head-and-shoulders shot works best;
  anything from about 800×1000 up is plenty.

Also update the matching URLs and the title/description in `index.html`.

---

## Replacing the project media

The eight projects are real — written from the repositories you built or
contributed to. Only the **media** is still placeholder: each points at a
hand-drawn SVG at `public/projects/<id>.svg`, sketched to match that project so
the page looks finished out of the box.

Where the work was not solo, set `role` (e.g. `'Contributor · 13 merged PRs'`)
and it appears in the metadata line — so a collaboration never reads as sole
ownership.

To swap one in:

1. Put your screenshot in `public/projects/`.
2. Point `media.src` at it in `src/data/projects.ts`.

Two are quick wins — the screenshots already exist in your own repos:

```bash
gh api repos/Konkz7/Unity-Possessed-Platformer/contents/screenshots/Screenshot1.png \
  --jq '.download_url' | xargs curl -sL -o public/projects/possessed.png
gh api repos/Konkz7/Chess-Engine/contents/screenshots/chess_ss.png \
  --jq '.download_url' | xargs curl -sL -o public/projects/chess-engine.png
```

Then change the two `media.src` values from `.svg` to `.png`.

Media renders in a fixed **16:10** frame with `object-cover`, so any
landscape-ish image works. Aim for roughly 1600×1000.

For motion, use a short MP4 rather than a GIF — far smaller:

```ts
media: {
  kind: 'video',
  src: '/projects/demo.mp4',
  poster: '/projects/demo-poster.png',
  alt: 'Describe what the clip shows',
}
```

Videos autoplay muted and looped, and fall back to ordinary playback controls
for anyone who has asked for reduced motion. Images below the fold lazy-load.

Exactly one project should have `featured: true` — it gets the large
two-column layout at the top of the section.

---

## Connecting the enquiry form

There is no backend. Submission is isolated in one function:
**`src/lib/enquiry.ts`**.

Out of the box the form runs in **preview mode**: it validates properly, shows
the real success state, logs the payload to the console, and offers a
pre-filled `mailto:` link so an enquiry is never lost.

To send for real, create `.env.local` (see `.env.example`):

```bash
VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Any provider that accepts a JSON `POST` works — Formspree, Web3Forms, Getform,
Basin, Netlify Forms, or your own serverless function. Restart the dev server
after adding it. If you need a different shape of request, `submitEnquiry()` is
the only place to change.

Validation rules live in `src/lib/validate-enquiry.ts`.

---

## Regenerating the social preview image

`public/og/cover.png` (1200×630) is rendered from `og-source.html` in the
project root. That file sits outside `public/`, so it is never deployed.

After changing your name or tagline, edit `og-source.html`, run the dev server,
open `http://localhost:5173/og-source.html`, and screenshot the page at
1200×630 into `public/og/cover.png`.

---

## Design system

One dark theme, defined entirely by CSS variables at the top of
`src/index.css`. Change the tokens there and the whole site follows.

- **Type** — Instrument Sans for UI, Instrument Serif (italic) for the one
  accented phrase per heading, JetBrains Mono for labels and tech tags.
- **Colour** — near-black warm neutrals, a warm off-white for type, and a
  single amber accent used sparingly: focus rings, active states, section
  eyebrows, the availability dot. The primary button is white, not coloured.
- **Motion** — short fades on scroll, nothing decorative. Everything is
  disabled under `prefers-reduced-motion`, both in CSS and via Framer Motion's
  `useReducedMotion()`.

### Structure

```
src/
  components/
    ui/            shadcn/ui primitives (button, input, textarea, select, label, sheet)
    Navbar  Hero  Services  Projects  ProjectCard  ProjectMedia
    HowICanHelp  About  Contact  ContactForm  Footer
    SectionHeading  Reveal  Wordmark  BrandIcons
  data/            all editable content
  hooks/           useActiveSection, useScrolled
  lib/             enquiry submission, validation, cn()
  types.ts         shared types
```

`components.json` is configured, so `npx shadcn@latest add <component>` will
drop new primitives straight into `src/components/ui/`.

---

## Accessibility notes

- Skip link, one `<main>`, semantic sections with `aria-labelledby`.
- Form fields use real labels, `aria-invalid` and `aria-describedby`; a failed
  submit moves focus to the first invalid field.
- Visible focus ring on every interactive element.
- Text colours meet WCAG AA against the background.
- Full keyboard support for the mobile menu and selects (via Radix).
