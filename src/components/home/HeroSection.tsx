'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { companyInfo } from '@/data/companyInfo'
import { useCountUp } from '@/hooks/useCountUp'

// Dynamically import three.js-backed shader so it doesn't block initial
// hydration. ssr:false because WebGL is a browser-only API.
const AnimatedShaderBackground = dynamic(
  () =>
    import('@/components/ui/animated-shader-background').then(
      (m) => m.AnimatedShaderBackground,
    ),
  { ssr: false },
)

/* ─── Animation Variants ─── */
const ease = [0.25, 0.4, 0.25, 1] as const

const blurFade = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease },
  }),
}

const softFade = {
  hidden: { opacity: 0, y: 16 },
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

  const count = useCountUp(value, 2200, started)

  return (
    <motion.div variants={blurFade} initial="hidden" animate="visible" custom={delay}>
      <div
        className="font-heading font-extrabold mb-1"
        style={{
          fontSize: 'clamp(32px, 3.5vw, 52px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: highlight ? '#c8956c' : '#ffffff',
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="font-body text-[11px] font-medium tracking-[0.1em] uppercase"
        style={{ color: 'rgba(255,255,255,0.3)' }}
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
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: '#06090f' }}
      aria-label="Hero section"
    >
      {/* Animated aurora shader — fills the entire section */}
      <AnimatedShaderBackground />

      {/* Light uniform tint for text legibility — no nested wrappers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(6,9,15,0.32)' }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full container-wide py-32 md:py-40 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Headline area */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <motion.div
              variants={blurFade}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[1.5px] bg-[#c8956c]" />
              <span className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c8956c]">
                Est. 1988 &middot; Commercial Fleet Specialists
              </span>
            </motion.div>

            {/* Headline — line-by-line blur reveal */}
            <h1
              className="font-heading font-extrabold text-white mb-8"
              style={{
                fontSize: 'clamp(42px, 5.8vw, 80px)',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                maxWidth: '740px',
              }}
            >
              <motion.span
                className="block"
                variants={blurFade}
                initial="hidden"
                animate="visible"
                custom={0.25}
              >
                Fleet Solutions
              </motion.span>
              <motion.span
                className="block"
                variants={blurFade}
                initial="hidden"
                animate="visible"
                custom={0.38}
              >
                for India&apos;s{' '}
                <span
                  className="italic font-bold"
                  style={{ color: '#c8956c' }}
                >
                  Biggest
                </span>
              </motion.span>
              <motion.span
                className="block"
                variants={blurFade}
                initial="hidden"
                animate="visible"
                custom={0.5}
              >
                Infrastructure.
              </motion.span>
            </h1>

            {/* Sub-copy */}
            <motion.p
              variants={softFade}
              initial="hidden"
              animate="visible"
              custom={0.62}
              className="font-body text-base md:text-lg mb-10"
              style={{
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '480px',
                lineHeight: 1.75,
              }}
            >
              500+ commercially plated vehicles serving PSUs, government bodies &amp;
              corporations across India. Zero exceptions on compliance.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={softFade}
              initial="hidden"
              animate="visible"
              custom={0.74}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/#call-basis-form"
                className="group inline-flex items-center gap-2.5 font-heading font-semibold text-[14px] text-[#0a0f1c] bg-white px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:bg-[#f8f8f6]"
              >
                Request a Vehicle
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                className="group inline-flex items-center gap-2.5 font-body font-medium text-[14px] px-8 py-4 rounded-xl border border-white/[0.12] text-white/60 transition-all duration-500 hover:border-white/[0.25] hover:text-white hover:bg-white/[0.04]"
              >
                <Phone
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                {companyInfo.phone}
              </a>
            </motion.div>
          </div>

          {/* Right — Animated stats */}
          <div className="lg:col-span-4">
            <div className="lg:border-l lg:border-white/[0.08] lg:pl-12 flex flex-row lg:flex-col gap-8 lg:gap-0">
              {[
                { value: 500, suffix: '+', label: 'Fleet Vehicles', delay: 0.8 },
                { value: 35, suffix: '+', label: 'Years Active', delay: 0.94 },
                {
                  value: 100,
                  suffix: '%',
                  label: 'Taxi Plated',
                  highlight: true,
                  delay: 1.08,
                },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex-1 lg:flex-none ${
                    idx > 0
                      ? 'lg:mt-10 lg:pt-10 lg:border-t lg:border-white/[0.08]'
                      : ''
                  }`}
                >
                  <AnimatedStat {...stat} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust bar — staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-20 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {['ONGC', 'Vedanta', 'BPCL', 'Adani Group', 'GVK EMRI'].map(
              (name, idx) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 + idx * 0.08, duration: 0.4 }}
                  className="font-heading font-semibold text-[11px] tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {name}
                </motion.span>
              ),
            )}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="font-body text-[11px]"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              &amp; 20+ more
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
