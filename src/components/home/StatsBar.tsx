'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

const stats = [
  { value: 500, suffix: '+', label: 'Fleet Vehicles', detail: 'Across all categories' },
  { value: 35, suffix: '+', label: 'Years of Service', detail: 'Established 1988' },
  { value: 100, suffix: '%', label: 'Taxi Plated', detail: 'Zero exceptions' },
  { value: 25, suffix: '+', label: 'Corporate Clients', detail: 'PSUs & Enterprises' },
]

function StatItem({ value, suffix, label, detail, inView, index }: {
  value: number; suffix: string; label: string; detail: string; inView: boolean; index: number
}) {
  const count = useCountUp(value, 2000, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="flex flex-col"
    >
      <div
        className="font-heading font-extrabold mb-1"
        style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: '#0a0f1c',
        }}
      >
        {count}{suffix}
      </div>
      <div className="font-heading font-semibold text-[13px] text-[#0a0f1c] mb-0.5">{label}</div>
      <div className="font-body text-[12px] text-[#9ca3af]">{detail}</div>
    </motion.div>
  )
}

export function StatsBar() {
  const { ref, inView } = useInView(0.2)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Company statistics"
      className="bg-[#fafaf8] border-b border-black/[0.04]"
    >
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <StatItem key={stat.label} {...stat} inView={inView} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
