'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, BadgeCheck, Clock } from 'lucide-react'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'
import { useCountUp } from '@/hooks/useCountUp'

/* ─── Animation Variants ─── */
const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease },
  }),
}

/* ─── Animated Stat Counter ─── */
function AnimatedStat({
  value,
  suffix,
  label,
  highlight,
  delay,
}: {
  value: number
  suffix: string
  label: string
  highlight?: boolean
  delay: number
}) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const count = useCountUp(value, 1800, started)

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={delay}>
      <div
        className="font-heading font-extrabold mb-1"
        style={{
          fontSize: 'clamp(28px, 2.6vw, 40px)',
          lineHeight: 1,
          letterSpacing: '-0.025em',
          color: highlight ? '#c8956c' : '#ffffff',
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="font-body text-[10.5px] font-medium tracking-[0.14em] uppercase"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {label}
      </div>
    </motion.div>
  )
}

/* ─── Hero Section ─── */
export function HeroSection() {
  return (
    <section
      className="relative bg-[var(--color-ice)] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle background texture — diagonal grid + soft amber wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,15,28,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,15,28,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 30% 40%, #000 50%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(200,149,108,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative container-wide pt-20 pb-0 md:pt-28 md:pb-0 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* ─── Left: Editorial content ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center pb-16 lg:pb-32">
            {/* Eyebrow pill */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="inline-flex items-center gap-2 self-start mb-7 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-silver)] shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              <span className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-slate)]">
                Est. 1988 · Trusted by Govt. of India
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-heading font-extrabold mb-6 text-[var(--color-navy)]"
              style={{
                fontSize: 'clamp(40px, 5.4vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                maxWidth: '720px',
              }}
            >
              <motion.span
                className="block"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
              >
                Commercial Fleet,
              </motion.span>
              <motion.span
                className="block"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.32}
              >
                Driven by{' '}
                <span
                  className="italic font-bold relative inline-block"
                  style={{ color: '#c8956c' }}
                >
                  Compliance
                  <svg
                    aria-hidden
                    className="absolute left-0 -bottom-1 w-full"
                    height="10"
                    viewBox="0 0 200 10"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2 7 Q 50 2, 100 5 T 198 4"
                      stroke="#c8956c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.9, duration: 0.9, ease }}
                    />
                  </svg>
                </span>
                .
              </motion.span>
            </h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="font-body text-base md:text-[17px] mb-9 text-[var(--color-slate)]"
              style={{
                maxWidth: '540px',
                lineHeight: 1.65,
              }}
            >
              500+ <strong className="text-[var(--color-navy)]">100% Taxi Plated</strong>{' '}
              vehicles serving PSUs, government bodies, and India&apos;s largest
              corporations. Audit-ready paperwork. Zero exceptions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/#call-basis-form"
                className="group inline-flex items-center justify-center gap-2.5 font-heading font-semibold text-[14px] text-white bg-[var(--color-navy)] px-7 py-4 rounded-xl transition-all duration-300 hover:bg-[var(--color-navy-light)] hover:shadow-[0_18px_40px_-12px_rgba(10,15,28,0.45)] hover:-translate-y-0.5"
              >
                Request a Vehicle
                <ArrowRight
                  size={15}
                  strokeWidth={2.25}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                className="group inline-flex items-center justify-center gap-2.5 font-body font-semibold text-[14px] px-7 py-4 rounded-xl bg-white border border-[var(--color-silver)] text-[var(--color-navy)] transition-all duration-300 hover:border-[var(--color-navy)] hover:shadow-md"
              >
                <Phone
                  size={14}
                  strokeWidth={2}
                  className="text-[#c8956c] transition-transform duration-300 group-hover:rotate-12"
                />
                {companyInfo.phone}
              </a>
            </motion.div>

            {/* Trust strip — feature pills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {[
                { icon: BadgeCheck, label: '100% Taxi Plated' },
                { icon: ShieldCheck, label: 'Govt. Empanelled' },
                { icon: Clock, label: '24×7 Dispatch' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className="text-[var(--color-success)]"
                  />
                  <span className="font-body text-[13px] font-medium text-[var(--color-slate)]">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Navy showcase panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="lg:col-span-5 relative"
          >
            <div
              className="relative h-full min-h-[440px] lg:min-h-[560px] rounded-2xl lg:rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between"
              style={{
                background:
                  'linear-gradient(155deg, #0a0f1c 0%, #111827 55%, #1a2332 100%)',
                boxShadow:
                  '0 30px 80px -24px rgba(10,15,28,0.45), 0 8px 20px -8px rgba(10,15,28,0.25)',
              }}
            >
              {/* Decorative grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              {/* Soft amber glow */}
              <div
                aria-hidden
                className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(200,149,108,0.22) 0%, transparent 70%)',
                }}
              />

              {/* Top: Tag + abstract vehicle silhouette */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-body text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white/45">
                    Fleet Intelligence
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c8956c]/15 border border-[#c8956c]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8956c]" />
                    <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-[#c8956c]">
                      Live
                    </span>
                  </span>
                </div>

                {/* Abstract SUV silhouette */}
                <svg
                  aria-hidden
                  viewBox="0 0 320 100"
                  className="w-full h-auto mb-6"
                  fill="none"
                >
                  <motion.path
                    d="M10 78 L40 78 C45 60 60 50 90 48 L130 44 C160 40 180 38 210 42 L240 46 C265 48 280 58 285 78 L310 78"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.6, ease }}
                  />
                  <motion.path
                    d="M50 78 L290 78"
                    stroke="#c8956c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.4, ease }}
                  />
                  {/* wheels */}
                  <motion.circle
                    cx="80"
                    cy="82"
                    r="9"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.6, ease }}
                  />
                  <motion.circle
                    cx="250"
                    cy="82"
                    r="9"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.7, ease }}
                  />
                </svg>

                <div className="font-heading font-bold text-white text-[20px] lg:text-[22px] leading-tight tracking-[-0.015em] mb-2">
                  Sedans, SUVs, Tempo Travellers &amp; Buses.
                </div>
                <p className="font-body text-[13px] text-white/55 leading-relaxed max-w-[320px]">
                  Pan-India deployment from a single point of contact.
                </p>
              </div>

              {/* Stats grid */}
              <div className="relative z-10 grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/[0.08]">
                {[
                  { value: 500, suffix: '+', label: 'Fleet Vehicles', delay: 0.7 },
                  { value: 35, suffix: '+', label: 'Years Active', delay: 0.84 },
                  {
                    value: 100,
                    suffix: '%',
                    label: 'Taxi Plated',
                    highlight: true,
                    delay: 0.98,
                  },
                ].map((stat) => (
                  <AnimatedStat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Trust bar (clients) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease }}
          className="mt-12 lg:mt-16 pt-8 pb-10 border-t border-[var(--color-silver)]"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <span
              className="font-body text-[10.5px] font-semibold tracking-[0.18em] uppercase shrink-0"
              style={{ color: 'var(--color-slate-muted)' }}
            >
              Trusted by
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {['ONGC', 'Vedanta', 'BPCL', 'Adani Group', 'GVK EMRI', 'IFFCO'].map(
                (name, idx) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + idx * 0.06, duration: 0.4 }}
                    className="font-heading font-bold text-[12px] tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    {name}
                  </motion.span>
                ),
              )}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="font-body text-[12px] italic"
                style={{ color: 'var(--color-slate-muted)' }}
              >
                &amp; 20+ more
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
