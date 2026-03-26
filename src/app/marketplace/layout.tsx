import type { Metadata } from 'next'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Used Vehicles for Sale in Ahmedabad | GEOS Fleet Marketplace',
  description:
    'Browse quality used cars, SUVs & commercial vehicles for sale in Ahmedabad. All vehicles are 100% commercially plated & verified. Direct from GEOS Enterprises fleet — Gujarat.',
  keywords:
    'used cars Ahmedabad, used vehicles for sale Gujarat, used SUV Ahmedabad, second hand commercial vehicle Ahmedabad, taxi plated used cars Gujarat, fleet vehicles for sale',
  alternates: { canonical: `${SEO_DEFAULTS.url}/marketplace` },
  openGraph: {
    title: 'Used Vehicles for Sale in Ahmedabad | GEOS Fleet Marketplace',
    description:
      'Quality used cars & commercial vehicles in Ahmedabad. 100% commercially plated, verified fleet vehicles direct from GEOS Enterprises.',
    url: `${SEO_DEFAULTS.url}/marketplace`,
  },
}

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
