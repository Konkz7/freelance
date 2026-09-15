import {
  budgetOptions,
  projectTypeOptions,
  timeframeOptions,
} from '@/data/enquiry-options'
import { site } from '@/data/site'
import type { EnquiryPayload, EnquiryResult } from '@/types'

/* ===========================================================================
 * Enquiry submission
 * ===========================================================================
 * This site has no backend. Submission is deliberately isolated in this one
 * function so it can be pointed at a provider without touching the form.
 *
 * ---------------------------------------------------------------------------
 * TO GO LIVE: create `.env.local` in the project root with
 *
 *     VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/xxxxxxxx
 *
 * Any provider that accepts a JSON POST works — Formspree, Web3Forms,
 * Getform, Basin, Netlify Forms, or your own function. Restart `npm run dev`
 * after adding the variable.
 *
 * With no endpoint set the form still works: it validates, then hands off to
 * the visitor's email client with every answer pre-filled. Nothing is silently
 * swallowed, and the site needs no server. Setting the endpoint upgrades it to
 * a background POST with no other change.
 * ---------------------------------------------------------------------------
 */

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined

/** Brief pause so the pending state is visible before the hand-off. */
const HANDOFF_DELAY_MS = 400

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, HANDOFF_DELAY_MS))
    // Opens the visitor's mail client; the page itself is not unloaded.
    window.location.href = buildMailtoHref(payload)
    return { ok: true, mode: 'mailto' }
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        // Most providers use this to set the reply-to address.
        _replyto: payload.email,
        _subject: `New project enquiry — ${payload.headline}`,
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        error:
          'That did not go through. Please try again, or email me directly.',
      }
    }

    return { ok: true, mode: 'endpoint' }
  } catch {
    return {
      ok: false,
      error:
        'Could not reach the server. Check your connection, or email me directly.',
    }
  }
}

/**
 * A pre-filled mailto link containing everything the visitor typed. Used as
 * the fallback on the confirmation screen and when submission fails, so an
 * enquiry is never lost.
 */
/** Turns a stored option value ('5k-15k') back into its label ('£5,000 – £15,000'). */
function labelFor(
  options: { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}

export function buildMailtoHref(payload: EnquiryPayload): string {
  // Only the answered optional questions appear.
  const optional = [
    payload.budget ? `Budget: ${labelFor(budgetOptions, payload.budget)}` : null,
    payload.timeframe
      ? `Timeframe: ${labelFor(timeframeOptions, payload.timeframe)}`
      : null,
  ].filter((line): line is string => line !== null)

  // Not filtered — the empty string is the blank line before the description.
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Needs: ${payload.headline}`,
    `Project type: ${
      payload.projectType
        ? labelFor(projectTypeOptions, payload.projectType)
        : 'Not specified'
    }`,
    ...optional,
    '',
    payload.description,
  ]

  const subject = encodeURIComponent(
    `Project enquiry — ${payload.headline || 'New project'}`,
  )
  const body = encodeURIComponent(lines.join('\n'))

  return `mailto:${site.email}?subject=${subject}&body=${body}`
}
