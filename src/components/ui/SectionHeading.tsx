import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      {label && (
        <p className="font-heading font-semibold text-accent text-sm uppercase tracking-widest mb-3">
          {label}
        </p>
      )}
      <h2 className="font-heading font-semibold text-navy mb-4">{title}</h2>
      {subtitle && (
        <p className="font-body text-slate text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
