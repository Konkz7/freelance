import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, CircleAlert, Loader2, Mail, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  budgetOptions,
  projectTypeOptions,
  timeframeOptions,
} from '@/data/enquiry-options'
import { buildMailtoHref, submitEnquiry } from '@/lib/enquiry'
import {
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  FIELD_ORDER,
  emptyEnquiry,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
} from '@/lib/validate-enquiry'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'
import type { EnquiryPayload, ProjectType } from '@/types'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/* -------------------------------------------------------------------------
 * Field wrapper — keeps label, hint and error wiring consistent.
 * ---------------------------------------------------------------------- */

interface FieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: ReactNode
  children: ReactNode
  className?: string
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>
          {label}
          {optional && (
            <span className="font-normal text-fg-subtle">Optional</span>
          )}
        </Label>
        {hint}
      </div>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-xs text-destructive"
        >
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------
 * Confirmation shown after a successful send.
 * ---------------------------------------------------------------------- */

function SuccessPanel({
  payload,
  mode,
  onReset,
}: {
  payload: EnquiryPayload
  mode: 'endpoint' | 'mailto'
  onReset: () => void
}) {
  const handedOff = mode === 'mailto'

  return (
    <div className="flex min-h-[28rem] flex-col items-start justify-center rounded-2xl border border-line bg-surface p-8 sm:p-10">
      <span className="grid size-11 place-items-center rounded-full border border-gold/40 bg-gold-dim text-gold">
        <Check className="size-5" />
      </span>

      <h3 className="mt-6 text-2xl font-medium text-fg">
        {handedOff
          ? 'One last step — press send.'
          : 'Thanks — that has come through.'}
      </h3>

      <p className="mt-3 max-w-md leading-relaxed text-fg-muted">
        {handedOff ? (
          <>
            Your email app should have opened with everything you wrote already
            filled in. Send it and it reaches me directly.
          </>
        ) : (
          <>
            I read enquiries myself and usually reply the same day. If it is
            urgent, email me directly and I will pick it up faster.
          </>
        )}
      </p>

      {handedOff && (
        <p className="mt-5 flex items-start gap-2.5 rounded-lg border border-line-strong bg-base p-3.5 text-xs leading-relaxed text-fg-subtle">
          <CircleAlert
            aria-hidden="true"
            className="mt-px size-3.5 shrink-0 text-gold"
          />
          <span>
            Nothing opened? Email{' '}
            <a
              href={buildMailtoHref(payload)}
              className="font-medium text-fg-muted underline underline-offset-4 hover:text-gold"
            >
              {site.email}
            </a>{' '}
            and paste your message in &mdash; or use the button below.
          </span>
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline">
          <a href={buildMailtoHref(payload)}>
            <Mail className="size-4" />
            {handedOff ? 'Open the email again' : 'Send it by email instead'}
          </a>
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Send another enquiry
        </Button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * The form.
 * ---------------------------------------------------------------------- */

export function ContactForm() {
  const [values, setValues] = useState<EnquiryPayload>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [sentMode, setSentMode] = useState<'endpoint' | 'mailto'>('mailto')

  const formRef = useRef<HTMLFormElement>(null)

  /** The values as sent, kept so the confirmation can offer an email fallback. */
  const [submitted, setSubmitted] = useState<EnquiryPayload>(emptyEnquiry)

  const clearError = (field: keyof EnquiryPayload) =>
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })

  const setValue = (field: keyof EnquiryPayload, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)

    // Clear an existing error as soon as the field becomes valid, but do not
    // introduce new errors while someone is still typing.
    if (errors[field] && !validateField(field, next)) {
      clearError(field)
    }
  }

  const handleBlur = (field: keyof EnquiryPayload) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, values)

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    } else {
      clearError(field)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    const nextErrors = validateEnquiry(values)
    setErrors(nextErrors)
    setTouched(
      Object.fromEntries(FIELD_ORDER.map((field) => [field, true])),
    )

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      const element = formRef.current?.querySelector<HTMLElement>(
        `#enquiry-${firstInvalid}`,
      )
      element?.focus()
      element?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setStatus('submitting')
    const result = await submitEnquiry(values)

    if (result.ok) {
      setSubmitted(values)
      setSentMode(result.mode)
      setStatus('success')
      setValues(emptyEnquiry)
      setTouched({})
      return
    }

    setStatus('error')
    setSubmitError(result.error)
  }

  const handleReset = () => {
    setStatus('idle')
    setErrors({})
    setSubmitError(null)
  }

  if (status === 'success') {
    return (
      <SuccessPanel
        payload={submitted}
        mode={sentMode}
        onReset={handleReset}
      />
    )
  }

  const describedBy = (field: keyof EnquiryPayload) =>
    errors[field] && touched[field] ? `enquiry-${field}-error` : undefined

  const invalid = (field: keyof EnquiryPayload) =>
    Boolean(errors[field] && touched[field])

  const descriptionLength = values.description.trim().length

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="enquiry-name"
          label="Name"
          error={invalid('name') ? errors.name : undefined}
        >
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            placeholder="Jordan Ellis"
            value={values.name}
            onChange={(event) => setValue('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={invalid('name')}
            aria-describedby={describedBy('name')}
          />
        </Field>

        <Field
          id="enquiry-email"
          label="Email"
          error={invalid('email') ? errors.email : undefined}
        >
          <Input
            id="enquiry-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jordan@company.com"
            value={values.email}
            onChange={(event) => setValue('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={invalid('email')}
            aria-describedby={describedBy('email')}
          />
        </Field>

        <Field
          id="enquiry-headline"
          label="What do you need built?"
          className="sm:col-span-2"
          error={invalid('headline') ? errors.headline : undefined}
        >
          <Input
            id="enquiry-headline"
            name="headline"
            placeholder="An Android app for booking our delivery slots"
            value={values.headline}
            onChange={(event) => setValue('headline', event.target.value)}
            onBlur={() => handleBlur('headline')}
            aria-invalid={invalid('headline')}
            aria-describedby={describedBy('headline')}
          />
        </Field>

        <Field
          id="enquiry-projectType"
          label="Project type"
          className="sm:col-span-2"
          error={invalid('projectType') ? errors.projectType : undefined}
        >
          <Select
            value={values.projectType}
            onValueChange={(value) => {
              setValue('projectType', value as ProjectType)
              setTouched((prev) => ({ ...prev, projectType: true }))
              clearError('projectType')
            }}
          >
            <SelectTrigger
              id="enquiry-projectType"
              aria-invalid={invalid('projectType')}
              aria-describedby={describedBy('projectType')}
            >
              <SelectValue placeholder="Choose the closest match" />
            </SelectTrigger>
            <SelectContent>
              {projectTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          id="enquiry-description"
          label="Project description"
          className="sm:col-span-2"
          error={invalid('description') ? errors.description : undefined}
          hint={
            descriptionLength > 0 ? (
              <span
                className={cn(
                  'font-mono text-[0.6875rem] tabular-nums',
                  descriptionLength > DESCRIPTION_MAX
                    ? 'text-destructive'
                    : 'text-fg-subtle',
                )}
              >
                {descriptionLength}/{DESCRIPTION_MAX}
              </span>
            ) : null
          }
        >
          <Textarea
            id="enquiry-description"
            name="description"
            rows={6}
            placeholder={`What are you trying to achieve, and who is it for? Anything already built, deadlines, or constraints I should know about. At least ${DESCRIPTION_MIN} characters.`}
            value={values.description}
            onChange={(event) => setValue('description', event.target.value)}
            onBlur={() => handleBlur('description')}
            aria-invalid={invalid('description')}
            aria-describedby={describedBy('description')}
            className="min-h-36"
          />
        </Field>

        <Field id="enquiry-budget" label="Estimated budget" optional>
          <Select
            value={values.budget}
            onValueChange={(value) => setValue('budget', value)}
          >
            <SelectTrigger id="enquiry-budget">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="enquiry-timeframe" label="Desired timeframe" optional>
          <Select
            value={values.timeframe}
            onValueChange={(value) => setValue('timeframe', value)}
          >
            <SelectTrigger id="enquiry-timeframe">
              <SelectValue placeholder="Select a timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Live region so screen readers hear submission problems. */}
      <div aria-live="polite" className="empty:hidden">
        {submitError && (
          <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5 text-sm text-fg">
            <CircleAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-destructive"
            />
            <span>
              {submitError}{' '}
              <a
                href={buildMailtoHref(values)}
                className="font-medium underline underline-offset-4 hover:text-gold"
              >
                Send it by email instead
              </a>
              .
            </span>
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-fg-subtle">
          No newsletter, no CRM. Your details are only used to reply.
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
