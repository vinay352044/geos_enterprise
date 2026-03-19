'use client'

import { Box } from '@mui/material'
import { CheckCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  highlight?: boolean
  inView: boolean
}

function StatItem({ value, suffix, label, highlight, inView }: StatItemProps) {
  const count = useCountUp(value, 2000, inView)
  return (
    <div className={`text-center px-6 py-4 ${highlight ? 'relative' : ''}`}>
      {highlight && (
        <div className="absolute inset-0 rounded-lg opacity-90" style={{ backgroundColor: '#8E1B2D' }} />
      )}
      <div className={`relative ${highlight ? 'flex flex-col items-center' : ''}`}>
        {highlight && <CheckCircle size={20} className="text-green-300 mb-1" />}
        <div
          className={`font-heading font-bold text-4xl md:text-5xl ${
            highlight ? 'text-white' : 'text-navy'
          }`}
        >
          {count}
          {suffix}
        </div>
        <div
          className={`font-body text-sm mt-1 font-medium ${
            highlight ? 'text-green-200' : 'text-slate'
          }`}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export function StatsBar() {
  const { ref, inView } = useInView(0.2)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 bg-bg-light"
      aria-label="Company statistics"
    >
      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-slate/20">
          <StatItem value={500} suffix="+" label="Fleet Vehicles" inView={inView} />
          <StatItem value={15} suffix="+" label="Years of Service" inView={inView} />
          <StatItem value={100} suffix="%" label="Taxi Plated" highlight inView={inView} />
          <StatItem value={25} suffix="+" label="Corporate Clients" inView={inView} />
        </div>
      </Box>
    </section>
  )
}
