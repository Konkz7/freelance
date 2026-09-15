import type { EnquiryPayload } from '@/types'

export type EnquiryErrors = Partial<Record<keyof EnquiryPayload, string>>

/** Order fields are focused in when a submit fails validation. */
export const FIELD_ORDER: (keyof EnquiryPayload)[] = [
  'name',
  'email',
  'headline',
  'projectType',
  'description',
  'budget',
  'timeframe',
]

export const DESCRIPTION_MIN = 30
export const DESCRIPTION_MAX = 2000

// Deliberately permissive: enough to catch typos, not enough to reject valid
// but unusual addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const emptyEnquiry: EnquiryPayload = {
  name: '',
  email: '',
  headline: '',
  projectType: '',
  description: '',
  budget: '',
  timeframe: '',
}

/**
 * Validates a single field. Returns an error message, or undefined when the
 * value is acceptable. Used both on submit and on blur.
 */
export function validateField(
  field: keyof EnquiryPayload,
  values: EnquiryPayload,
): string | undefined {
  const value = values[field].trim()

  switch (field) {
    case 'name':
      if (!value) return 'Please tell me your name.'
      if (value.length < 2) return 'That looks a little short.'
      return undefined

    case 'email':
      if (!value) return 'I need an email address to reply to.'
      if (!EMAIL_PATTERN.test(value))
        return 'That does not look like a valid email address.'
      return undefined

    case 'headline':
      if (!value) return 'A one-line summary helps me respond usefully.'
      if (value.length < 4) return 'A few more words, please.'
      return undefined

    case 'projectType':
      if (!value) return 'Pick the closest option.'
      return undefined

    case 'description':
      if (!value) return 'Please describe the project.'
      if (value.length < DESCRIPTION_MIN)
        return `A little more detail, please — at least ${DESCRIPTION_MIN} characters.`
      if (value.length > DESCRIPTION_MAX)
        return `Please keep this under ${DESCRIPTION_MAX} characters.`
      return undefined

    // Budget and timeframe are optional.
    default:
      return undefined
  }
}

/** Validates every field. An empty object means the form is ready to send. */
export function validateEnquiry(values: EnquiryPayload): EnquiryErrors {
  const errors: EnquiryErrors = {}

  for (const field of FIELD_ORDER) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }

  return errors
}
