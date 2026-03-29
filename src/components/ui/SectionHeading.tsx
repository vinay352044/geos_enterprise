import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ label, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      {label && (
        <p
          className="font-heading font-bold text-[11px] uppercase tracking-[0.18em] mb-3 flex items-center gap-2"
          style={{
            color: '#8E1B2D',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <span
            className="inline-block h-0.5 w-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#8E1B2D' }}
          />
          {label}
        </p>
      )}
      <h2 className="font-heading font-bold mb-4" style={{ color: '#0D1B3E' }}>{title}</h2>
      {subtitle && (
        <p
          className="font-body text-lg leading-relaxed"
          style={{
            color: '#475569',
            maxWidth: '640px',
            margin: align === 'center' ? '0 auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
