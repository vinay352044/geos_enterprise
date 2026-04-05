'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Building } from 'lucide-react'

const ease = [0.25, 1, 0.5, 1] as const

const milestones = [
  {
    year: '1988',
    event: 'Founded by George Varghese in Ahmedabad, Gujarat. First government transport contracts awarded.',
  },
  {
    year: 'Mid 1990s',
    event: 'Expanded into corporate fleet solutions. Secured first energy sector clients in the western India corridor.',
  },
  {
    year: '2000s',
    event: 'Partnered with ONGC and BPCL for large-scale fleet provisioning across infrastructure projects.',
  },
  {
    year: '2010s',
    event: 'Onboarded Vedanta, GVK EMRI, and Adani Group. Fleet expanded to 100% commercial plating compliance.',
  },
  {
    year: 'Present',
    event: 'Continuing to serve government and corporate clients while expanding into used vehicle sales — offering quality fleet vehicles directly to the public.',
  },
]

const credentials = [
  { label: 'GST Registration', value: '24AASFG7969G1ZQ', icon: CheckCircle },
  { label: 'Established', value: '1988 — 35+ Years in Operation', icon: Calendar },
  { label: 'Headquarters', value: 'Ahmedabad, Gujarat, India', icon: Building },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#0a0f1c',
          paddingTop: 'clamp(120px, 14vw, 180px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
        }}
      >
        {/* Subtle warm glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '600px', height: '600px', top: '-100px', right: '-100px',
            background: 'radial-gradient(circle, rgba(200,149,108,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#c8956c]" />
                <span className="font-body text-[12px] font-medium tracking-[0.15em] uppercase text-[#c8956c]">
                  Est. 1988 &middot; Ahmedabad, India
                </span>
              </div>

              <h1
                className="font-heading font-extrabold text-white mb-6"
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.035em',
                }}
              >
                India&apos;s Most{' '}
                <span className="italic" style={{ color: '#c8956c' }}>Trusted</span>
                <br />Fleet Partner.
              </h1>

              <p className="font-body text-base leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
                From government corridors to the heart of India&apos;s energy sector — Geos Enterprises has delivered reliable, compliant fleet solutions for over three decades.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-10 mt-10">
                {[
                  { value: '35+', label: 'Years' },
                  { value: '100%', label: 'Plated' },
                  { value: '25+', label: 'Clients' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading font-extrabold text-white text-2xl" style={{ letterSpacing: '-0.02em' }}>
                      {s.value}
                    </div>
                    <div className="font-body text-[11px] text-white/30 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Founder card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="w-full max-w-sm rounded-2xl p-8 relative"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="font-body text-[11px] font-medium tracking-[0.12em] uppercase text-[#c8956c] mb-6 block">
                  Founder &amp; Chairman
                </span>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-heading font-bold text-lg mb-5"
                  style={{ border: '1px solid rgba(200,149,108,0.3)', color: '#c8956c', backgroundColor: 'rgba(200,149,108,0.06)' }}
                >
                  GV
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-1">George Varghese</h3>
                <p className="font-body text-[11px] text-white/30 tracking-wide mb-5">
                  Visionary &middot; Entrepreneur &middot; Leader
                </p>
                <blockquote
                  className="font-body italic leading-relaxed text-sm"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    borderLeft: '2px solid rgba(200,149,108,0.3)',
                    paddingLeft: '16px',
                  }}
                >
                  &ldquo;Built on integrity and driven by the belief that every contract is a promise — to our clients, our drivers, and our nation.&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story + Milestones */}
      <section className="section-py bg-[#fafaf8]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="section-label mb-5 inline-flex">OUR STORY</span>

              <h2
                className="font-heading font-extrabold mb-8"
                style={{ color: '#0a0f1c', letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                Three decades of
                <br />
                <span style={{ color: '#c8956c' }}>driving India forward.</span>
              </h2>

              <div className="space-y-5 font-body text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                <p>
                  In 1988, <strong style={{ color: '#0a0f1c' }}>George Varghese</strong> founded Geos Enterprises with a singular conviction — that India&apos;s growing infrastructure needed fleet partners it could truly rely on.
                </p>
                <p>
                  What began as a local transport contractor evolved into one of India&apos;s respected names in{' '}
                  <strong style={{ color: '#0a0f1c' }}>government and corporate fleet provisioning</strong>. Over the decades, Geos Enterprises forged long-standing relationships with the giants of India&apos;s energy, mining, and infrastructure sectors.
                </p>
                <p>
                  Today, the company operates a <strong style={{ color: '#0a0f1c' }}>100% commercially plated, fully verified fleet</strong> — offering everything from executive car hire to heavy-duty logistics support, and a growing public marketplace for quality used commercial vehicles.
                </p>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2.5 mt-8">
                {['GST Registered', 'All India Permit', '100% Taxi Plated', 'Commercial Insurance'].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-body font-medium"
                    style={{
                      backgroundColor: '#f0fdf4',
                      color: '#1a7a42',
                    }}
                  >
                    <CheckCircle size={11} strokeWidth={1.5} />
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <span className="section-label mb-8 inline-flex">MILESTONES</span>

              <div className="relative space-y-0">
                {/* Vertical line */}
                <div
                  className="absolute left-[5px] top-2 bottom-2 w-[1px] rounded-full"
                  style={{ backgroundColor: '#e5e2dd' }}
                />

                {milestones.map((m, idx) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease }}
                    className="relative flex gap-5 pb-8"
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="w-[11px] h-[11px] rounded-full mt-1"
                        style={{
                          backgroundColor: '#0a0f1c',
                          border: '2px solid #fafaf8',
                          boxShadow: '0 0 0 1px #0a0f1c',
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm mb-1" style={{ color: '#0a0f1c' }}>
                        {m.year}
                      </p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                        {m.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-py bg-white border-t border-black/[0.04]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-10"
          >
            <span className="section-label justify-center mb-4 inline-flex">LEGAL &amp; COMPLIANCE</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {credentials.map((c, idx) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease }}
                  className="bg-[#fafaf8] rounded-xl p-6 text-center border border-black/[0.04]"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-4 bg-[#f5f3f0]">
                    <Icon size={16} style={{ color: '#6b7280' }} strokeWidth={1.5} />
                  </div>
                  <p className="font-body text-[11px] font-medium tracking-wider uppercase mb-2 text-[#9ca3af]">
                    {c.label}
                  </p>
                  <p className="font-body text-sm font-medium" style={{ color: '#0a0f1c' }}>{c.value}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
