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
    category: 'EMERGENCY SERVICES · HEALTHCARE',
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
    description: 'Multiple state and central government departments served across Gujarat and beyond.',
    logo: null,
    accent: '#10B981',
    isMore: true,
  },
]

function LogoCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [autoplay.current])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {[...clients, ...clients].map((client, idx) => (
          <div key={`${client.id}-${idx}`} className="flex-none flex flex-col items-center gap-2">
            <div
              className="w-28 h-16 rounded-lg overflow-hidden flex items-center justify-center p-2 transition-all duration-300"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="relative w-full h-full">
                <Image src={client.logoPath} alt={client.name} fill className="object-contain" sizes="112px" />
              </div>
            </div>
            <span className="text-xs font-heading font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientCarousel() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24"
      style={{ backgroundColor: '#0B1E4A' }}
      aria-label="Our clients"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-heading font-bold text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(240,165,0,0.12)', color: '#F0A500', border: '1px solid rgba(240,165,0,0.25)' }}
              >
                TRUSTED BY
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-white leading-tight text-4xl lg:text-5xl">
              Powering{' '}
              <em style={{ color: '#F0A500', fontStyle: 'italic' }}>India&apos;s</em>
              <br />Biggest Names.
            </h2>
          </div>
          <div>
            <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              From state-owned oil giants to private conglomerates building tomorrow&apos;s India — our fleet has served the organisations that move the nation forward.
            </p>
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredClients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group rounded-xl p-6 flex flex-col min-h-[200px] overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: client.isMore ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full transition-all duration-300 group-hover:top-4 group-hover:bottom-4"
                style={{ backgroundColor: client.accent }}
              />

              {/* Top row: category + logo */}
              <div className="flex items-start justify-between mb-4 pl-4">
                <span
                  className="font-heading font-bold text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: `${client.accent}18`, color: client.accent }}
                >
                  {client.category}
                </span>
                {client.logo && (
                  <div
                    className="relative w-12 h-8 rounded-md overflow-hidden flex-shrink-0 ml-3"
                    style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                  >
                    <Image src={client.logo} alt={client.name} fill className="object-contain p-1" sizes="48px" />
                  </div>
                )}
              </div>

              {/* Client name & description */}
              <div className="flex-1 pl-4">
                <h3
                  className="font-heading font-extrabold text-2xl mb-2 transition-colors duration-200"
                  style={{ color: client.isMore ? client.accent : '#ffffff' }}
                >
                  {client.name}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {client.description}
                </p>
              </div>

              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${client.accent}0A 0%, transparent 60%)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Logo Carousel */}
        <div className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-center font-heading text-xs tracking-[0.2em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.25)' }}>
            ALSO SERVING
          </p>
          <LogoCarousel />
        </div>
      </div>
    </section>
  )
}
