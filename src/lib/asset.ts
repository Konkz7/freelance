/**
 * Resolves a path in `public/` against the app's base URL.
 *
 * Vite rewrites asset URLs inside HTML and CSS, but *not* absolute paths
 * written as strings in TypeScript. The site is served from a subdirectory on
 * GitHub Pages (`/freelance/`), so a bare `/projects/x.svg` would 404 there.
 * Run every public-folder path through this.
 *
 * Dev (`base: '/'`)          → '/projects/x.svg'
 * Build (`base: '/freelance/'`) → '/freelance/projects/x.svg'
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
