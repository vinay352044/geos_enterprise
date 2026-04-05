'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'

type Client = {
  id: string
  tag: string
  name: string
  description: string
  logo: string
}

const allClients: Client[] = [
  {
    id: 'ongc',
    tag: 'Oil & Gas',
    name: 'ONGC',
    description:
      "India's largest state-owned oil & gas explorer — fleet partner since inception.",
    logo: '/images/clients/ongc.jpg',
  },
  {
    id: 'vedanta',
    tag: 'Resources',
    name: 'Vedanta',
    description:
      'Diversified natural resources conglomerate — powering operations across India.',
    logo: '/images/clients/vedanta.jpg',
  },
  {
    id: 'bpcl',
    tag: 'Petroleum',
    name: 'BPCL',
    description:
      'Fortune Global 500 oil major — trusted fleet logistics across refineries.',
    logo: '/images/clients/bpcl.jpg',
  },
  {
    id: 'gvk',
    tag: 'Healthcare',
    name: 'GVK EMRI',
    description:
      "Operating India's 108 ambulance service — where every minute counts.",
    logo: '/images/clients/gvk-emri.jpg',
  },
  {
    id: 'adani',
    tag: 'Infrastructure',
    name: 'Adani Group',
    description:
      'Ports, energy, logistics & infrastructure leader — scaling with our fleet.',
    logo: '/images/clients/adani.jpg',
  },
  {
    id: 'nhsrcl',
    tag: 'Railways',
    name: 'NHSRCL',
    description:
      "National High Speed Rail Corporation — building India's bullet train corridor.",
    logo: '/images/clients/nhsrcl.jpg',
  },
  {
    id: 'iffco',
    tag: 'Agriculture',
    name: 'IFFCO',
    description:
      "World's largest fertilizer cooperative — fleet services across India.",
    logo: '/images/clients/iffco.jpg',
  },
  {
    id: 'eil',
    tag: 'Engineering',
    name: 'EIL',
    description:
      "Engineers India Limited — engineering consultancy for India's energy sector.",
    logo: '/images/clients/eil.jpg',
  },
  {
    id: 'gvk112',
    tag: 'Emergency',
    name: 'GVK 112',
    description: "Jan Rakshak — India's unified emergency response service.",
    logo: '/images/clients/call-112.jpg',
  },
  {
    id: 'nclt',
    tag: 'Judiciary',
    name: 'NCLT',
    description:
      "National Company Law Tribunal — serving India's corporate legal framework.",
    logo: '/images/clients/nclt.jpg',
  },
]

const ease = [0.25, 1, 0.5, 1] as const

/** Client card — elevated logo tile + bigger breathing room. */
function ClientCard({ client }: { client: Client }) {
  return (
    <div className="group bg-white rounded-2xl p-7 flex flex-col w-[320px] md:w-[380px] min-h-[240px] border border-black/[0.05] transition-all duration-400 hover:border-black/[0.12] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1">
      {/* Top: tag + logo */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-md"
          style={{ backgroundColor: '#f5f3f0', color: '#6b7280' }}
        >
          {client.tag}
        </span>
        {client.logo && (
          <div
            className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-white"
            style={{
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              fill
              className="object-contain p-1.5"
              sizes="80px"
            />
          </div>
        )}
      </div>

      {/* Name */}
      <h3
        className="font-heading font-bold text-xl mb-2 leading-tight"
        style={{ color: '#0a0f1c' }}
      >
        {client.name}
      </h3>

      {/* Description */}
      <p
        className="font-body text-sm leading-relaxed mt-auto"
        style={{ color: '#9ca3af' }}
      >
        {client.description}
      </p>
    </div>
  )
}

export function ClientCarousel() {
  const { ref, inView } = useInView(0.1)

  // Split into two rows for a layered, opposing-direction effect.
  const firstHalf = allClients.slice(0, 5)
  const secondHalf = allClients.slice(5)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Our clients"
      className="section-py bg-[#fafaf8]"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-12"
        >
          <span className="section-label mb-5 inline-flex">OUR CLIENTS</span>
          <h2
            className="font-heading font-extrabold mb-4"
            style={{ color: '#0a0f1c' }}
          >
            Trusted by India&apos;s
            <br />
            biggest names.
          </h2>
          <p
            className="font-body text-base"
            style={{ color: '#6b7280', lineHeight: 1.7 }}
          >
            From state-owned oil giants to private conglomerates building
            tomorrow&apos;s India — our fleet has served the organisations that
            move the nation forward.
          </p>
        </motion.div>

        {/* Infinite scrolling rows */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="space-y-6"
        >
          <InfiniteMovingCards
            items={firstHalf}
            getKey={(client) => client.id}
            renderItem={(client) => <ClientCard client={client} />}
            direction="left"
            speed="slow"
          />

          <InfiniteMovingCards
            items={secondHalf}
            getKey={(client) => client.id}
            renderItem={(client) => <ClientCard client={client} />}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </div>
    </section>
  )
}
