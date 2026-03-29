'use client'

import { motion } from 'framer-motion'
import { Car, Clock, BadgeCheck, Users } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

const stats = [
  {
    icon: Car,
    value: 500,
    suffix: '+',
    label: 'Fleet Vehicles',
    sub: 'Across all categories',
    iconColor: '#60A5FA',
    iconBg: 'rgba(37,99,235,0.12)',
  },
  {
    icon: Clock,
    value: 35,
    suffix: '+',
    label: 'Years of Service',
    sub: 'Established 1988',
    iconColor: '#F0A500',
    iconBg: 'rgba(240,165,0,0.12)',
  },
  {
    icon: BadgeCheck,
    value: 100,
    suffix: '%',
    label: 'Taxi Plated',
    sub: 'Zero exceptions',
    highlight: true,
    iconColor: '#4ADE80',
    iconBg: 'rgba(22,101,52,0.15)',
  },
  {
    icon: Users,
    value: 25,
    suffix: '+',
    label: 'Corporate Clients',
    sub: 'PSUs & Enterprises',
    iconColor: '#C084FC',
    iconBg: 'rgba(139,92,246,0.12)',
  },
]

interface StatItemProps {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  sub: string
  highlight?: boolean
  iconColor: string
  iconBg: string
  inView: boolean
  delay: number
}

function StatItem({ icon: Icon, value, suffix, label, sub, highlight, iconColor, iconBg, inView, delay }: StatItemProps) {
  const count = useCountUp(value, 2000, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center px-6 py-8"
      style={
        highlight
          ? {
              background: 'linear-gradient(135deg, rgba(22,101,52,0.15) 0%, rgba(22,101,52,0.06) 100%)',
              border: '1px solid rgba(74,222,128,0.15)',
              borderRadius: '16px',
            }
          : {}
      }
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: iconBg, border: `1px solid ${iconColor}25` }}
      >
        <Icon size={22} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>

      {/* Value */}
      <div
        className="font-heading font-extrabold mb-1"
        style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          lineHeight: 1,
          color: highlight ? '#4ADE80' : '#ffffff',
          letterSpacing: '-0.02em',
        }}
      >
        {count}{suffix}
      </div>

      {/* Label */}
      <div className="font-heading font-bold text-white text-sm mb-1">{label}</div>

      {/* Sub */}
      <div className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</div>
    </motion.div>
  )
}

export function StatsBar() {
  const { ref, inView } = useInView(0.2)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Company statistics"
      style={{ background: 'linear-gradient(180deg, #040B18 0%, #060E1E 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container-wide py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:divide-x lg:divide-white/[0.06] lg:gap-0">
          {stats.map((stat, idx) => (
            <StatItem key={stat.label} {...stat} inView={inView} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
