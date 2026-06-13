import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { CallBasisForm } from '@/components/home/CallBasisForm'
import { ClientCarousel } from '@/components/home/ClientCarousel'
import { Testimonials } from '@/components/home/Testimonials'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CTABanner } from '@/components/home/CTABanner'
import { MarketplacePreview } from '@/components/home/MarketplacePreview'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Car Rental, Contract Hire & Used Vehicles | GEOS Ahmedabad',
  description:
    'Need a car on rent, long-term contract vehicle for your business, or a reliable used car in Ahmedabad? GEOS Enterprises serves contractors, corporates & individuals with flexible, affordable vehicle solutions across Gujarat.',
  keywords: SEO_DEFAULTS.keywords,
  alternates: { canonical: SEO_DEFAULTS.url },
  openGraph: {
    title: 'Car Rental, Contract Hire & Used Vehicles | GEOS Ahmedabad',
    description:
      'Car rental, contract hire & used vehicles in Ahmedabad. GEOS Enterprises — 100% commercially plated fleet serving corporates, PSUs & individuals across Gujarat.',
    url: SEO_DEFAULTS.url,
    images: [{ url: SEO_DEFAULTS.ogImage, width: 1200, height: 630, alt: 'GEOS Enterprises — Car Rental & Fleet Solutions Ahmedabad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Rental, Contract Hire & Used Vehicles | GEOS Ahmedabad',
    description: 'Car rental, contract hire & used vehicles in Ahmedabad. 100% commercially plated fleet across Gujarat.',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CallBasisForm />
      <MarketplacePreview />
      <ClientCarousel />
      <Testimonials />
      <WhyChooseUs />
      <CTABanner />
    </>
  )
}
