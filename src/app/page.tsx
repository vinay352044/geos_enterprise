import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { ClientCarousel } from '@/components/home/ClientCarousel'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CallBasisForm } from '@/components/home/CallBasisForm'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GEOS Enterprises | Corporate & Government Fleet Logistics India',
  description:
    'GEOS Enterprises — Trusted corporate vehicle rental for PSUs, ONGC, BPCL & government bodies. 100% taxi plated fleet. 15+ years, 500+ vehicles across India.',
  alternates: { canonical: SEO_DEFAULTS.url },
  openGraph: {
    title: 'GEOS Enterprises | Corporate & Government Fleet Logistics India',
    description: 'Specialized vehicle provisioning for PSUs and government. 100% Commercially Plated Fleet.',
    url: SEO_DEFAULTS.url,
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ClientCarousel />
      <WhyChooseUs />
      <CallBasisForm />
    </>
  )
}
