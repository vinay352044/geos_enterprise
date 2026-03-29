'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Star, Building2 } from 'lucide-react'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'

const trustItems = [
  { icon: ShieldCheck, label: '100% Taxi Plated', sub: 'Verified fleet' },
  { icon: Building2, label: '35+ Years', sub: 'Established 1988' },
  { icon: Star, label: '25+ Clients', sub: 'PSUs & Corporates' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
      style={{
        background: 'linear-gradient(155deg, #040B18 0%, #0A1830 30%, #0C1F4A 55%, #0D1635 80%, #030A14 100%)',
      }}
    >
      {/* Background layers */}
      {/* Large blue orb — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px',
          height: '900px',
          top: '-300px',
          left: '-300px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.08) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Purple accent orb — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          bottom: '-200px',
          right: '-200px',
          background: 'radial-gradient(circle, rgba(88,28,135,0.2) 0%, rgba(67,20,140,0.08) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Crimson accent — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          bottom: '10%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(142,27,45,0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Animated breathing orb — center */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '15%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      />

      {/* Fine noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizontal glow line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '42%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.12) 25%, rgba(59,130,246,0.25) 50%, rgba(59,130,246,0.12) 75%, transparent 100%)',
        }}
      />

      {/* === Main Content === */}
      <div className="relative z-10 w-full container-wide flex flex-col items-center text-center text-white pt-28 pb-20 md:pt-36 md:pb-28">

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 text-xs font-heading font-bold uppercase tracking-widest"
          style={{
            background: 'linear-gradient(135deg, rgba(240,165,0,0.1) 0%, rgba(240,165,0,0.05) 100%)',
            border: '1px solid rgba(240,165,0,0.28)',
            color: '#F0A500',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 24px rgba(240,165,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#F0A500', boxShadow: '0 0 8px #F0A500' }}
          />
          India&apos;s Trusted Commercial Fleet Partner
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold mb-6 mx-auto"
          style={{ maxWidth: '1050px', lineHeight: 1.06, fontSize: 'clamp(36px, 4.2vw, 72px)', letterSpacing: '-0.025em' }}
        >
          <span className="text-white">Fleet Solutions for</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(95deg, #60a5fa 0%, #93c5fd 45%, #bfdbfe 75%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
          >
            India&apos;s Infrastructure Giants.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg md:text-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(191,219,254,0.6)', maxWidth: '640px', letterSpacing: '0.01em' }}
        >
          Specialized vehicle provisioning for PSUs, government bodies &amp; corporations.
          Every vehicle 100% Commercially Plated — no exceptions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/#call-basis-form"
            className="group inline-flex items-center gap-2.5 font-heading font-bold text-[13px] uppercase tracking-wider text-white px-8 py-4 rounded-xl min-h-[52px] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C21E35 0%, #7A1525 100%)',
              boxShadow: '0 0 0 1px rgba(220,38,57,0.25), 0 6px 28px rgba(142,27,45,0.4)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '0 0 0 1px rgba(220,38,57,0.45), 0 10px 40px rgba(142,27,45,0.6)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '0 0 0 1px rgba(220,38,57,0.25), 0 6px 28px rgba(142,27,45,0.4)'
              el.style.transform = 'translateY(0)'
            }}
          >
            Request a Vehicle
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2.5 font-heading font-bold text-[13px] uppercase tracking-wider px-8 py-4 rounded-xl min-h-[52px] transition-all duration-300"
            style={{
              color: '#bfdbfe',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(147,197,253,0.2)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.09)'
              el.style.borderColor = 'rgba(147,197,253,0.38)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.05)'
              el.style.borderColor = 'rgba(147,197,253,0.2)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <Phone size={15} />
            Call Now
          </a>
        </motion.div>

        {/* Trust items */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:divide-x sm:divide-white/10"
        >
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 sm:px-8 first:sm:pl-0 last:sm:pr-0"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Icon size={16} style={{ color: '#60a5fa' }} />
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-white text-sm leading-tight">{item.label}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Scroll
        </span>
        <div
          className="w-5 h-8 border rounded-full flex justify-center pt-1.5"
          style={{ borderColor: 'rgba(96,165,250,0.25)' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'rgba(96,165,250,0.6)' }}
          />
        </div>
      </motion.div>

      {/* Bottom fade to seamlessly connect to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(4,11,24,0.8) 100%)' }}
      />
    </section>
  )
}
