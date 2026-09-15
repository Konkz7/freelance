import type { ProjectType } from '@/types'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

/** Options for the "Project type" select. Values are stored in the payload. */
export const projectTypeOptions: SelectOption<ProjectType>[] = [
  { value: 'android', label: 'Android app' },
  { value: 'web', label: 'Web application' },
  { value: 'unity', label: 'Unity / game project' },
  { value: 'backend', label: 'Backend, API or microservice' },
  { value: 'feature', label: 'New feature in an existing app' },
  { value: 'audit', label: 'Codebase audit' },
  { value: 'other', label: 'Something else' },
]

/** Optional. Ranges are deliberately broad — this is a starting point. */
export const budgetOptions: SelectOption[] = [
  { value: 'under-2k', label: 'Under £2,000' },
  { value: '2k-5k', label: '£2,000 – £5,000' },
  { value: '5k-15k', label: '£5,000 – £15,000' },
  { value: '15k-plus', label: '£15,000+' },
  { value: 'unsure', label: 'Not sure yet' },
]

/** Optional. */
export const timeframeOptions: SelectOption[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'month', label: 'Within a month' },
  { value: '1-3-months', label: 'One to three months' },
  { value: '3-plus-months', label: 'Three months or later' },
  { value: 'flexible', label: 'Flexible' },
]

/** Sets expectations directly under the form heading. */
export const whatHappensNext: string[] = [
  'I read every enquiry myself, usually the same day.',
  'You get a reply with questions, or a call if that is easier.',
  'We agree a scope and a fixed price before any work starts.',
]
