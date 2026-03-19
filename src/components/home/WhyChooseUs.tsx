'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const pillars = [
  {
    emoji: '🛡️',
    title: 'Compliance',
    description: '100% commercially plated fleet. Every vehicle verified, insured, and compliant with government regulations — no exceptions.',
  },
  {
    emoji: '🤝',
    title: 'Trust',
    description: 'Over 35 years of relationship-driven business. Our clients return because we treat every contract as a long-term commitment.',
  },
  {
    emoji: '⚡',
    title: 'Reliability',
    description: 'On-time deployment, responsive support, and zero-compromise on service quality — whether it\'s one vehicle or a hundred.',
  },
  {
    emoji: '🚀',
    title: 'Scale',
    description: 'From executive sedans to heavy-duty fleet — and now a public marketplace for used vehicles. One partner, end-to-end.',
  },
]

export function WhyChooseUs() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20"
      style={{ backgroundColor: '#F5F7FC' }}
      aria-label="Why choose GEOS Enterprises"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="font-heading font-bold text-xs tracking-widest uppercase" style={{ color: '#8E1B2D' }}>
              WHY CHOOSE GEOS
            </span>
            <span style={{ display: 'block', height: '2px', width: '40px', backgroundColor: '#8E1B2D' }} />
          </div>
          <h2 className="font-heading font-extrabold mb-4" style={{ color: '#12235A' }}>
            Built on Four Pillars
          </h2>
          <p className="font-body max-w-2xl mx-auto" style={{ color: '#334155', fontSize: '17px' }}>
            Every vehicle we deploy, every contract we sign — guided by the same principles our founder set in 1988.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-white rounded-2xl p-8 flex flex-col"
              style={{ boxShadow: '0 2px 16px rgba(18,35,90,0.07)', border: '1px solid #E8ECF4', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(18,35,90,0.12)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(18,35,90,0.07)'
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6" style={{ backgroundColor: '#12235A' }}>
                {pillar.emoji}
              </div>
              <h3 className="font-heading font-bold text-xl mb-3" style={{ color: '#12235A' }}>
                {pillar.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#334155' }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
