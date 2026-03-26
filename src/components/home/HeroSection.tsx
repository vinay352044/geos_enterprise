'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
      style={{
        background: 'linear-gradient(135deg, #060d1f 0%, #0d1f4a 30%, #0f2a6b 55%, #1a1040 80%, #0a0a1a 100%)',
      }}
    >
      {/* Mesh gradient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          top: '-200px',
          left: '-200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(37,99,235,0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          bottom: '-150px',
          right: '-150px',
          background: 'radial-gradient(circle, rgba(99,37,185,0.3) 0%, rgba(67,20,140,0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '20%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(29,78,216,0.25) 0%, transparent 65%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          bottom: '15%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(142,27,45,0.2) 0%, transparent 65%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />

      {/* Animated slow orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 65%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      {/* Fine noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glowing line accent — horizontal */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '38%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.15) 30%, rgba(96,165,250,0.3) 50%, rgba(96,165,250,0.15) 70%, transparent 100%)',
        }}
      />

      {/* === Content === */}
      <div className="relative z-10 w-full container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 text-sm font-heading font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(240,165,0,0.12), rgba(240,165,0,0.06))',
              border: '1px solid rgba(240,165,0,0.3)',
              color: '#F0A500',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(240,165,0,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#F0A500', boxShadow: '0 0 6px #F0A500' }} />
            100% Commercially Plated Fleet — Verified &amp; Compliant
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75 }}
            className="font-heading font-extrabold mb-6 mx-auto"
            style={{ maxWidth: '1100px', lineHeight: 1.08, fontSize: 'clamp(34px, 3.8vw, 68px)' }}
          >
            <span className="text-white">Reliable Fleet Solutions</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 40%, #bfdbfe 70%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for India&apos;s Infrastructure Giants.
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-body text-lg md:text-xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'rgba(191,219,254,0.65)', maxWidth: '720px' }}
          >
            Specialized vehicle provisioning for Government &amp; Corporate sectors.
            <br />
            100% Commercially Plated Fleet.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link
              href="/#call-basis-form"
              className="group inline-flex items-center gap-2 font-heading font-bold text-base uppercase tracking-wider text-white px-8 py-4 rounded-xl min-h-[56px] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
                boxShadow: '0 0 0 1px rgba(239,68,68,0.3), 0 8px 32px rgba(185,28,28,0.4)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 0 1px rgba(239,68,68,0.5), 0 12px 40px rgba(185,28,28,0.6)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 0 1px rgba(239,68,68,0.3), 0 8px 32px rgba(185,28,28,0.4)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Book a Vehicle <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 font-heading font-bold text-base uppercase tracking-wider px-8 py-4 rounded-xl min-h-[56px] transition-all duration-300"
              style={{
                color: '#bfdbfe',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(147,197,253,0.25)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.1)'
                el.style.borderColor = 'rgba(147,197,253,0.45)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.06)'
                el.style.borderColor = 'rgba(147,197,253,0.25)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <Phone size={18} /> Call Now
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 border rounded-full flex justify-center pt-2"
          style={{ borderColor: 'rgba(96,165,250,0.3)' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(96,165,250,0.7)' }}
          />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(6,13,31,0.7))',
        }}
      />
    </section>
  )
}
