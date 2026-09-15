import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the header can highlight the
 * matching nav link. `ids` should be section element ids without the hash.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer whichever visible section is highest up the page.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) setActive(visible[0].target.id)
      },
      {
        // Trigger once a section reaches the upper third of the viewport.
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
