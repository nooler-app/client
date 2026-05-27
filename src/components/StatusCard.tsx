import type { ReactNode } from 'react'

type StatusCardProps = {
  children: ReactNode
  label: string
  tone?: 'success' | 'error'
}

export function StatusCard({ children, label, tone = 'success' }: StatusCardProps) {
  return (
    <div className={`status-card ${tone}`}>
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  )
}

