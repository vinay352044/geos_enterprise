'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Handshake, Zap, Globe } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { HolographicCard } from '@/components/ui/holographic-card'

const ease = [0.25, 1, 0.5, 1] as const

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Full Compliance',
    description: '100% commercially plated fleet. Every vehicle verified, insured, and compliant with all government regulations.',
    number: '01',
  },
  {
    icon: Handshake,
    title: 'Earned Trust',
    description: 'Over 35 years of relationship-driven business. Our clients return because we treat every contract as a long-term commitment.',
    number: '02',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description: 'On-time deployment, responsive support, and zero-compromise on service quality — one vehicle or a hundred.',
    number: '03',
  },
  {
    icon: Globe,
    title: 'Scale',
    description: 'From executive sedans to heavy-duty fleet. One trusted partner for end-to-end vehicle provisioning across India.',
    number: '04',
  },
]

export function WhyChooseUs() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Why choose GEOS Enterprises"
      className="section-py"
      style={{ backgroundColor: '#0a0f1c' }}
    >
      <div className="container-wide">
        {/* Header — asymmetric two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            <span className="section-label mb-5 inline-flex" style={{ color: '#c8956c' }}>
              WHY GEOS
            </span>
            <h2
              className="font-heading font-extrabold text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              Built on four
              <br />
              principles.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex items-end"
          >
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '420px' }}>
              Every vehicle we deploy, every contract we sign — guided by the same principles our founder set in 1988.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid — 2x2 with holographic tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            const isLarge = idx === 0 || idx === 3
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08, ease }}
              >
                <HolographicCard
                  className={`rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden ${
                    isLarge ? 'min-h-[300px]' : 'min-h-[260px]'
                  }`}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Top: number + icon */}
                  <div className="flex items-start justify-between mb-auto">
                    <span
                      className="font-heading font-bold text-[12px] tracking-[0.12em]"
                      style={{ color: 'rgba(200,149,108,0.5)' }}
                    >
                      {pillar.number}
                    </span>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(200,149,108,0.14) 0%, rgba(200,149,108,0.04) 100%)',
                        border: '1px solid rgba(200,149,108,0.25)',
                        boxShadow:
                          '0 0 24px rgba(200,149,108,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      <Icon
                        size={26}
                        style={{ color: '#c8956c' }}
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* Bottom: title + description */}
                  <div className="mt-10">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-3 leading-tight">
                      {pillar.title}
                    </h3>
                    <p
                      className="font-body text-sm md:text-[15px] leading-relaxed"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '380px',
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </HolographicCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
