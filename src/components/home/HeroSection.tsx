'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#12235A' }}
      aria-label="Hero section"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 text-sm font-heading font-semibold"
            style={{
              backgroundColor: 'rgba(240,165,0,0.1)',
              border: '1px solid rgba(240,165,0,0.35)',
              color: '#F0A500',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#F0A500' }} />
            100% Commercially Plated Fleet — Verified &amp; Compliant
          </motion.div>

          <h1
            className="font-heading font-extrabold text-white mb-6 mx-auto"
            style={{ maxWidth: '820px', lineHeight: 1.05 }}
          >
            Reliable Fleet Solutions<br />
            for India&apos;s Infrastructure Giants.
          </h1>

          <p
            className="font-body text-lg md:text-xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '560px' }}
          >
            Specialized vehicle provisioning for Government &amp; Corporate sectors.<br />
            100% Commercially Plated Fleet.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/#call-basis-form"
              className="inline-flex items-center gap-2 font-heading font-bold text-base uppercase tracking-wider text-white px-8 py-4 rounded-lg transition-colors min-h-[56px]"
              style={{ backgroundColor: '#8E1B2D' }}
            >
              Book a Vehicle <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 font-heading font-bold text-base uppercase tracking-wider text-white px-8 py-4 rounded-lg transition-colors min-h-[56px]"
              style={{ border: '2px solid rgba(255,255,255,0.25)', backgroundColor: 'transparent' }}
            >
              <Phone size={18} /> Call Now
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-2xl mx-auto h-px mb-12" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '500+', label: 'Fleet Vehicles' },
              { value: '15+', label: 'Years of Service' },
              { value: '100%', label: 'Taxi Plated' },
              { value: '25+', label: 'Corporate Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
                  {stat.value}
                </div>
                <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 rounded-full flex justify-center pt-2" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
