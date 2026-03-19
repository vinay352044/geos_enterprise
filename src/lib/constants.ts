export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const VEHICLE_CATEGORIES = [
  'All',
  'Sedan',
  'SUV',
  'Luxury SUV',
  'Tempo Traveller',
  'Minibus',
  'Bus',
] as const

export const SEO_DEFAULTS = {
  title: 'GEOS Enterprises | Corporate & Government Fleet Logistics India',
  description:
    'GEOS Enterprises — Specialized corporate vehicle rental for PSUs, ONGC, BPCL & government. 100% commercially plated taxi fleet. 15+ years, 500+ vehicles.',
  keywords:
    'corporate vehicle rental India, ONGC vehicle contractor, commercial fleet government projects, taxi plated fleet India, PSU vehicle provider, GEOS Enterprises',
  ogImage: '/images/og-image.jpg',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://geosenterprises.com',
} as const

export const COMPANY = {
  name: 'GEOS Enterprises',
  phone: '+91-92274-76900',
  email: 'geosenterprises@gmail.com',
  whatsapp: '919227476900',
  address: '507 Aagam Avenue, Near Adani Gas Station, Motera Cross Road, Sabarmati, Ahmedabad - 380005',
} as const

export const WHATSAPP_BASE = `https://wa.me/${COMPANY.whatsapp}?text=`

export function getWhatsAppInquiryUrl(vehicleName: string, listingId: string): string {
  const message = encodeURIComponent(
    `Hi GEOS Enterprises,\n\nI'm interested in the ${vehicleName} (Listing ID: ${listingId}) listed on your marketplace.\n\nPlease share more details and pricing.\n\nThank you.`,
  )
  return `${WHATSAPP_BASE}${message}`
}

export const RATE_LIMITS = {
  FORM_SUBMISSIONS: 5,
  OTP_REQUESTS: 5,
  WINDOW_MS: 3600000,
} as const
