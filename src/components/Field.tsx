import type { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Field({ label, ...props }: FieldProps) {
  return (
    <label>
      {label}
      <input {...props} />
    </label>
  )
}

