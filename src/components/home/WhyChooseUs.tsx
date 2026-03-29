'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Handshake, Zap, Globe } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Full Compliance',
    description: '100% commercially plated fleet. Every vehicle verified, insured, and compliant with all government regulations — zero compromises.',
    gradient: 'from-emerald-500/15 to-emerald-600/5',
    border: 'rgba(16,185,129,0.18)',
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#34D399',
    accentLine: '#10B981',
  },
  {
    icon: Handshake,
    title: 'Earned Trust',
    description: 'Over 35 years of relationship-driven business. Our clients return because we treat every contract as a long-term commitment to excellence.',
    gradient: 'from-blue-500/15 to-blue-600/5',
    border: 'rgba(59,130,246,0.18)',
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#60A5FA',
    accentLine: '#3B82F6',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description: 'On-time deployment, responsive support, and zero-compromise on service quality — whether it\'s one vehicle or a hundred.',
    gradient: 'from-amber-500/15 to-amber-600/5',
    border: 'rgba(245,158,11,0.18)',
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#FCD34D',
    accentLine: '#F59E0B',
  },
  {
    icon: Globe,
    title: 'Scale',
    description: 'From executive sedans to heavy-duty fleet. One trusted partner for end-to-end vehicle provisioning across India\'s largest projects.',
    gradient: 'from-purple-500/15 to-purple-600/5',
    border: 'rgba(139,92,246,0.18)',
    iconBg: 'rgba(139,92,246,0.12)',
    iconColor: '#C084FC',
    accentLine: '#8B5CF6',
  },
]

export function WhyChooseUs() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Why choose GEOS Enterprises"
      className="section-py"
      style={{ backgroundColor: '#F5F8FF' }}
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="section-label justify-center mb-5 inline-flex">WHY CHOOSE GEOS</span>
          <h2
            className="font-heading font-extrabold mb-5"
            style={{ color: '#0D1B3E' }}
          >
            Built on Four Pillars
          </h2>
          <p
            className="font-body mx-auto max-w-2xl"
            style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}
          >
            Every vehicle we deploy, every contract we sign — guided by the same principles our founder set in 1988.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white rounded-2xl p-7 flex flex-col overflow-hidden cursor-default"
                style={{
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(13,27,62,0.06)',
                  transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow = '0 16px 48px rgba(13,27,62,0.12)'
                  el.style.borderColor = pillar.border
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 4px 20px rgba(13,27,62,0.06)'
                  el.style.borderColor = '#E2E8F0'
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: pillar.accentLine }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: pillar.iconBg, border: `1px solid ${pillar.iconColor}22` }}
                >
                  <Icon size={22} style={{ color: pillar.iconColor }} strokeWidth={1.8} />
                </div>

                {/* Number */}
                <span
                  className="font-heading font-black text-5xl mb-3 leading-none select-none"
                  style={{ color: '#F0F4F8', letterSpacing: '-0.03em' }}
                >
                  0{idx + 1}
                </span>

                <h3
                  className="font-heading font-bold text-lg mb-3"
                  style={{ color: '#0D1B3E' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: '#475569' }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
