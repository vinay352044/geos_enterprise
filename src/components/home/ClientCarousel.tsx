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
    description: 'Oil and Natural Gas Corporation — India\'s largest state-owned oil & gas explorer',
  },
  {
    id: 'vedanta',
    category: 'RESOURCES · MINING',
    name: 'Vedanta',
    description: 'Vedanta Limited — diversified natural resources conglomerate',
  },
  {
    id: 'gvk',
    category: 'EMERGENCY SERVICES · HEALTHCARE',
    name: 'GVK EMRI',
    description: 'GVK EMRI — Emergency Management and Research Institute, operating India\'s 108 ambulance service',
  },
  {
    id: 'bpcl',
    category: 'PETROLEUM · PSU',
    name: 'BPCL',
    description: 'Bharat Petroleum Corporation Limited — Fortune Global 500 oil major',
  },
  {
    id: 'adani',
    category: 'CONGLOMERATE · PRIVATE',
    name: 'Adani Group',
    description: 'Adani Enterprises — ports, energy, logistics and infrastructure leader',
  },
  {
    id: 'more',
    category: 'GOVERNMENT CONTRACTS',
    name: '+ More',
    description: 'Multiple state and central government departments served across Gujarat and beyond.',
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
            <div className="w-28 h-16 rounded-lg overflow-hidden flex items-center justify-center p-2" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <div className="relative w-full h-full">
                <Image src={client.logoPath} alt={client.name} fill className="object-contain" sizes="112px" />
              </div>
            </div>
            <span className="text-xs font-heading font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{client.name}</span>
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
      className="py-20"
      style={{ backgroundColor: '#12235A' }}
      aria-label="Our clients"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <div className="section-label mb-4" style={{ color: '#F0A500' }}>
              <span>TRUSTED BY</span>
              <span style={{ display: 'block', height: '2px', width: '40px', backgroundColor: '#F0A500' }} />
            </div>
            <h2 className="font-heading font-extrabold text-white leading-tight">
              Powering{' '}
              <em style={{ color: '#F0A500', fontStyle: 'italic' }}>India&apos;s</em>
              <br />Biggest Names.
            </h2>
          </div>
          <div>
            <p className="font-body text-blue-200 text-lg leading-relaxed">
              From state-owned oil giants to private conglomerates building tomorrow&apos;s India — our fleet has served the organisations that move the nation forward.
            </p>
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
          {featuredClients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 flex flex-col justify-between min-h-[220px]"
              style={{ backgroundColor: client.isMore ? 'rgba(240,165,0,0.08)' : 'rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-heading font-semibold text-xs tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {client.category}
              </p>
              <div>
                <h3 className="font-heading font-bold text-white text-3xl mb-3" style={{ color: client.isMore ? '#F0A500' : '#ffffff' }}>
                  {client.name}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {client.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Carousel */}
        <div className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-center font-heading text-xs tracking-widest uppercase mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
            ALSO SERVING
          </p>
          <LogoCarousel />
        </div>
      </div>
    </section>
  )
}
