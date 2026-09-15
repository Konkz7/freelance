export interface AboutFact {
  label: string
  value: string
}

/** Short first-person intro. Two or three paragraphs — resist adding a CV. */
export const aboutParagraphs: string[] = [
  'I have been building software long enough to know the interesting part is rarely the code. It is working out what actually needs to exist, what can wait, and what will quietly cause problems six months from now.',
  'I work across the whole stack — Android in Kotlin, web in React and TypeScript, the backend services underneath, and Unity when something needs to be playable. That range means I can usually take a project end to end instead of handing it between people.',
  'I am based in London and work with clients remotely. Mostly individuals, startups and small teams who would rather talk directly to the person writing the code.',
]

/** The practical questions clients ask before getting in touch. */
export const aboutFacts: AboutFact[] = [
  { label: 'Based in', value: 'London, UK' },
  { label: 'Working', value: 'Remotely, UK and Europe' },
  { label: 'Typical engagement', value: 'Two weeks to three months' },
  { label: 'Also available for', value: 'Audits and one-off feature work' },
]
