import type { Metadata } from 'next'
import { SEO_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us — Car Rental & Fleet Enquiries | GEOS Ahmedabad',
  description:
    'Get in touch with GEOS Enterprises in Ahmedabad for car rental, long-term contract hire, or used vehicle enquiries. Serving corporates, PSUs & individuals across Gujarat.',
  keywords: 'contact GEOS Enterprises, car rental enquiry Ahmedabad, fleet hire Gujarat, vehicle inquiry Ahmedabad',
  alternates: { canonical: `${SEO_DEFAULTS.url}/contact` },
  openGraph: {
    title: 'Contact GEOS Enterprises — Car Rental & Fleet Services Ahmedabad',
    description: 'Reach out for car rental, contract hire or used vehicle queries. Based in Ahmedabad, serving all of Gujarat.',
    url: `${SEO_DEFAULTS.url}/contact`,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
