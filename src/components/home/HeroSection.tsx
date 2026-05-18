'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, BadgeCheck, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'

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

const CLIENT_LOGOS = [
  { name: 'ONGC', src: '/images/clients/ongc.jpg' },
  { name: 'BPCL', src: '/images/clients/bpcl.jpg' },
  { name: 'Adani', src: '/images/clients/adani.jpg' },
  { name: 'IFFCO', src: '/images/clients/iffco.jpg' },
  { name: 'NHSRCL', src: '/images/clients/nhsrcl.jpg' },
  { name: 'EIL', src: '/images/clients/eil.jpg' },
] as const

const METRICS = [
  { value: '500+', label: 'Fleet Vehicles' },
  { value: '35+', label: 'Years Active' },
  { value: '30+', label: 'Cities Served' },
  { value: '24×7', label: 'Ops Support' },
] as const

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

          {/* ─── Right: Fleet Credentials card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="lg:col-span-5 relative"
          >
            <div
              className="relative h-full min-h-[460px] lg:min-h-[580px] rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #0a0f1c 0%, #0f1828 55%, #1a2332 100%)',
                boxShadow: '0 32px 80px -20px rgba(10,15,28,0.55), 0 8px 24px -8px rgba(10,15,28,0.30)',
              }}
            >
              {/* Grid texture */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              {/* Amber glow — top right */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(200,149,108,0.20) 0%, transparent 65%)' }}
              />
              {/* Blue glow — bottom left */}
              <div
                aria-hidden
                className="absolute -bottom-16 -left-16 w-[260px] h-[260px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.18) 0%, transparent 65%)' }}
              />

              {/* ── Status bar ── */}
              <div className="relative z-10 px-7 lg:px-9 pt-7 lg:pt-9 flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-70" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
                  </span>
                  <span className="font-body text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white/40">
                    Fleet Status — Operational
                  </span>
                </span>
                <span className="font-body text-[10.5px] font-medium tracking-[0.10em] text-white/30">
                  Est. 1988
                </span>
              </div>

              {/* ── Hero stat — the dominant visual anchor ── */}
              <div className="relative z-10 px-7 lg:px-9 mt-6 lg:mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease }}
                >
                  <div
                    className="font-heading font-black leading-none tracking-tighter"
                    style={{
                      fontSize: 'clamp(72px, 7vw, 96px)',
                      color: '#c8956c',
                      textShadow: '0 0 60px rgba(200,149,108,0.35)',
                    }}
                  >
                    100%
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span
                      className="font-heading font-bold tracking-tight text-white"
                      style={{ fontSize: 'clamp(18px, 1.6vw, 22px)' }}
                    >
                      Taxi Plated
                    </span>
                    <span
                      className="font-body text-[12px] font-medium tracking-[0.06em] uppercase px-2 py-0.5 rounded"
                      style={{ background: 'rgba(200,149,108,0.15)', color: '#c8956c', border: '1px solid rgba(200,149,108,0.25)' }}
                    >
                      Every Vehicle
                    </span>
                  </div>
                  <p className="font-body text-[13px] text-white/45 mt-2 leading-relaxed">
                    Commercially registered. Audit-ready paperwork. Zero exceptions.
                  </p>
                </motion.div>
              </div>

              {/* ── 2×2 metrics grid ── */}
              <div className="relative z-10 px-7 lg:px-9 mt-6 lg:mt-8 grid grid-cols-2 gap-px rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {METRICS.map(({ value, label }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.07, ease }}
                    className="px-5 py-4"
                    style={{ background: 'rgba(10,15,28,0.60)' }}
                  >
                    <div
                      className="font-heading font-extrabold leading-none tracking-tight"
                      style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', color: '#ffffff' }}
                    >
                      {value}
                    </div>
                    <div className="font-body text-[10.5px] font-semibold tracking-[0.12em] uppercase text-white/40 mt-1.5">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ── Client logos horizontal strip ── */}
              <div className="relative z-10 mt-auto px-7 lg:px-9 pb-7 lg:pb-9 pt-6">
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
                    In service with
                  </p>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {CLIENT_LOGOS.map((c, idx) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + idx * 0.06, duration: 0.4 }}
                        title={c.name}
                        className="relative h-9 w-[64px] rounded-lg overflow-hidden shrink-0 transition-all duration-300 hover:opacity-100"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.09)',
                        }}
                      >
                        <Image
                          src={c.src}
                          alt={c.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5 brightness-0 invert opacity-60 hover:opacity-90 transition-opacity duration-300"
                        />
                      </motion.div>
                    ))}
                    <span className="font-body text-[11px] text-white/30 ml-1">+14 more</span>
                  </div>
                </div>
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
