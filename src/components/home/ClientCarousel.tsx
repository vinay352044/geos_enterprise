'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useInView } from '@/hooks/useInView'
import { clients } from '@/data/clients'

const featuredClients = [
  {
    id: 'ongc',
    category: 'OIL & GAS · PSU',
    name: 'ONGC',
    description: 'India\'s largest state-owned oil & gas explorer — fleet partner since inception.',
    logo: '/images/clients/ongc.jpg',
    accent: '#F0A500',
  },
  {
    id: 'vedanta',
    category: 'RESOURCES · MINING',
    name: 'Vedanta',
    description: 'Diversified natural resources conglomerate — powering operations across India.',
    logo: '/images/clients/vedanta.jpg',
    accent: '#3B82F6',
  },
  {
    id: 'gvk',
    category: 'EMERGENCY · HEALTHCARE',
    name: 'GVK EMRI',
    description: 'Operating India\'s 108 ambulance service — where every minute counts.',
    logo: '/images/clients/gvk-emri.jpg',
    accent: '#10B981',
  },
  {
    id: 'bpcl',
    category: 'PETROLEUM · PSU',
    name: 'BPCL',
    description: 'Fortune Global 500 oil major — trusted fleet logistics across refineries.',
    logo: '/images/clients/bpcl.jpg',
    accent: '#F0A500',
  },
  {
    id: 'adani',
    category: 'CONGLOMERATE · PRIVATE',
    name: 'Adani Group',
    description: 'Ports, energy, logistics & infrastructure leader — scaling with our fleet.',
    logo: '/images/clients/adani.jpg',
    accent: '#3B82F6',
  },
  {
    id: 'more',
    category: 'GOVERNMENT CONTRACTS',
    name: '+ More',
    description: 'Multiple state and central government departments across Gujarat and beyond.',
    logo: null,
    accent: '#10B981',
    isMore: true,
  },
]

function LogoCarousel() {
  const autoplay = useRef(Autoplay({ delay: 1800, stopOnInteraction: false }))
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [autoplay.current])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-5">
        {[...clients, ...clients].map((client, idx) => (
          <div key={`${client.id}-${idx}`} className="flex-none flex flex-col items-center gap-2">
            <div
              className="w-24 h-14 rounded-xl overflow-hidden flex items-center justify-center p-2.5 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="relative w-full h-full">
                <Image src={client.logoPath} alt={client.name} fill className="object-contain opacity-60 hover:opacity-90 transition-opacity" sizes="96px" />
              </div>
            </div>
            <span
              className="text-[10px] font-heading font-semibold tracking-wide"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientCarousel() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Our clients"
      className="section-py"
      style={{
        background: 'linear-gradient(180deg, #070E1E 0%, #0A1528 50%, #060E1A 100%)',
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 items-end">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 font-heading font-bold text-[10px] tracking-[0.22em] uppercase px-3.5 py-2 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(240,165,0,0.1)',
                color: '#F0A500',
                border: '1px solid rgba(240,165,0,0.22)',
              }}
            >
              TRUSTED BY INDIA&apos;S BEST
            </span>
            <h2
              className="font-heading font-extrabold text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.02em' }}
            >
              Powering{' '}
              <em style={{ color: '#F0A500', fontStyle: 'italic' }}>India&apos;s</em>
              <br />Biggest Names.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              From state-owned oil giants to private conglomerates building tomorrow&apos;s India — our fleet has served the organisations that move the nation forward.
            </p>
          </motion.div>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredClients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-6 flex flex-col min-h-[180px] overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: client.isMore ? `${client.accent}08` : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.backgroundColor = `${client.accent}08`
                el.style.borderColor = `${client.accent}20`
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.backgroundColor = client.isMore ? `${client.accent}08` : 'rgba(255,255,255,0.03)'
                el.style.borderColor = 'rgba(255,255,255,0.06)'
                el.style.transform = 'translateY(0)'
              }}
            >
              {/* Left accent line */}
              <div
                className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full transition-all duration-300 group-hover:top-3 group-hover:bottom-3"
                style={{ backgroundColor: client.accent }}
              />

              {/* Category + Logo */}
              <div className="flex items-start justify-between mb-4 pl-5">
                <span
                  className="font-heading font-bold text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: `${client.accent}15`, color: client.accent }}
                >
                  {client.category}
                </span>
                {client.logo && (
                  <div
                    className="relative w-11 h-7 rounded-lg overflow-hidden flex-shrink-0 ml-3"
                    style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                  >
                    <Image src={client.logo} alt={client.name} fill className="object-contain p-1" sizes="44px" />
                  </div>
                )}
              </div>

              {/* Name & Description */}
              <div className="flex-1 pl-5">
                <h3
                  className="font-heading font-extrabold text-xl mb-2 leading-tight"
                  style={{ color: client.isMore ? client.accent : '#ffffff' }}
                >
                  {client.name}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {client.description}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${client.accent}0A 0%, transparent 60%)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-center font-heading font-bold text-[10px] tracking-[0.22em] uppercase mb-8"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            ALSO SERVING
          </p>
          <LogoCarousel />
        </motion.div>
      </div>
    </section>
  )
}
