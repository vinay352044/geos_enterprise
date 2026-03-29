'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Award, Users, Calendar, Building } from 'lucide-react'

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

const stats = [
  { value: '35+', label: 'YEARS OF\nSERVICE' },
  { value: '100%', label: 'COMMERCIALLY\nPLATED' },
  { value: '8+', label: 'MAJOR\nCLIENTS' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #040B18 0%, #0A1830 35%, #0C1F4A 60%, #060E1A 100%)',
          paddingTop: 'clamp(100px, 12vw, 160px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
        }}
      >
        {/* Background orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '700px', height: '700px', top: '-200px', left: '-150px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px', height: '500px', bottom: '-100px', right: '-100px',
            background: 'radial-gradient(circle, rgba(142,27,45,0.12) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Watermark year */}
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 font-heading font-extrabold select-none pointer-events-none"
          style={{ fontSize: 'clamp(100px, 18vw, 200px)', color: 'rgba(255,255,255,0.025)', lineHeight: 1 }}
          aria-hidden="true"
        >
          1988
        </span>

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="font-heading font-bold text-[11px] tracking-[0.2em] uppercase mb-6 flex items-center gap-3"
                style={{ color: '#F0A500' }}
              >
                <span style={{ display: 'inline-block', height: '2px', width: '28px', backgroundColor: '#F0A500', borderRadius: '2px' }} />
                EST. 1988 · AHMEDABAD, INDIA
              </p>

              <h1 className="font-heading font-extrabold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                India&apos;s Most{' '}
                <em style={{ color: '#F0A500', fontStyle: 'italic' }}>Trusted</em>
                <br />Fleet Partner.
              </h1>

              <p className="font-body text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                From government corridors to the heart of India&apos;s energy sector — Geos Enterprises has delivered reliable, compliant fleet solutions for over three decades.
              </p>

              {/* Stats strip */}
              <div
                className="flex flex-wrap items-stretch divide-x divide-white/10"
                style={{
                  borderLeft: '3px solid #8E1B2D',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                {stats.map((s) => (
                  <div key={s.label} className="px-6 py-2 first:pl-6">
                    <div
                      className="font-heading font-extrabold text-white"
                      style={{ fontSize: '2rem', lineHeight: 1.1 }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="font-heading font-semibold text-[10px] tracking-widest mt-1 whitespace-pre-line"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Founder card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="w-full max-w-sm rounded-2xl p-8 relative"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="absolute top-0 left-8 h-0.5 w-16 rounded-full" style={{ backgroundColor: '#8E1B2D' }} />
                <p className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: '#F0A500' }}>
                  FOUNDER &amp; CHAIRMAN
                </p>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-bold text-xl mb-6"
                  style={{ border: '2px solid rgba(240,165,0,0.4)', color: '#F0A500', backgroundColor: 'rgba(240,165,0,0.08)' }}
                >
                  GV
                </div>
                <h3 className="font-heading font-bold text-white text-2xl mb-1">George Varghese</h3>
                <p className="font-heading font-semibold text-[10px] tracking-[0.16em] mb-6" style={{ color: '#F0A500' }}>
                  VISIONARY · ENTREPRENEUR · LEADER
                </p>
                <blockquote
                  className="font-body italic leading-relaxed text-sm"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    borderLeft: '3px solid #8E1B2D',
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
      <section className="section-py bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label mb-5 inline-flex">OUR STORY</span>

              <h2
                className="font-heading font-extrabold mb-8 leading-tight"
                style={{ color: '#0D1B3E' }}
              >
                Three Decades of<br />
                <span style={{ color: '#8E1B2D' }}>Driving India Forward.</span>
              </h2>

              <div className="space-y-5 font-body leading-relaxed" style={{ color: '#475569' }}>
                <p>
                  In 1988, <strong style={{ color: '#0D1B3E' }}>George Varghese</strong> founded Geos Enterprises with a singular conviction — that India&apos;s growing infrastructure needed fleet partners it could truly rely on. Starting from Ahmedabad, Gujarat, he built a company rooted in discipline, compliance, and service excellence.
                </p>
                <p>
                  What began as a local transport contractor evolved into one of India&apos;s respected names in{' '}
                  <strong style={{ color: '#0D1B3E' }}>government and corporate fleet provisioning</strong>. Over the decades, Geos Enterprises forged long-standing relationships with the giants of India&apos;s energy, mining, and infrastructure sectors.
                </p>
                <p>
                  Today, the company operates a <strong style={{ color: '#0D1B3E' }}>100% commercially plated, fully verified fleet</strong> — offering everything from executive car hire to heavy-duty logistics support, and a growing public marketplace for quality used commercial vehicles.
                </p>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['GST Registered', 'All India Permit', '100% Taxi Plated', 'Commercial Insurance'].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold"
                    style={{
                      backgroundColor: 'rgba(22,101,52,0.08)',
                      border: '1px solid rgba(22,101,52,0.2)',
                      color: '#166534',
                    }}
                  >
                    <CheckCircle size={12} />
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label mb-8 inline-flex">MILESTONES</span>

              <div className="relative space-y-0">
                {/* Vertical line */}
                <div
                  className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded-full"
                  style={{ backgroundColor: '#E2E8F0' }}
                />

                {milestones.map((m, idx) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex gap-5 pb-8"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="w-4 h-4 rounded-full mt-0.5"
                        style={{
                          backgroundColor: '#8E1B2D',
                          border: '3px solid white',
                          boxShadow: '0 0 0 2px #8E1B2D',
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm mb-1.5" style={{ color: '#0D1B3E' }}>
                        {m.year}
                      </p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: '#475569' }}>
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
      <section className="section-py" style={{ backgroundColor: '#F5F8FF' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="section-label justify-center mb-4 inline-flex">LEGAL &amp; COMPLIANCE</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {credentials.map((c, idx) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl p-6 text-center"
                  style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(13,27,62,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(142,27,45,0.08)', border: '1px solid rgba(142,27,45,0.15)' }}
                  >
                    <Icon size={18} style={{ color: '#8E1B2D' }} />
                  </div>
                  <p className="font-heading font-bold text-[11px] tracking-widest uppercase mb-2" style={{ color: '#8E1B2D' }}>
                    {c.label}
                  </p>
                  <p className="font-body text-sm" style={{ color: '#0D1B3E' }}>{c.value}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
