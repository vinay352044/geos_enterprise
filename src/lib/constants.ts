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
  title: 'Car Rental, Contract Hire & Used Vehicles | GEOS Ahmedabad',
  description:
    'Need a car on rent, long-term contract vehicle for your business, or a reliable used car in Ahmedabad? GEOS Enterprises serves contractors, corporates & individuals with flexible, affordable vehicle solutions across Gujarat.',
  keywords:
    'car rental Ahmedabad, car on rent Ahmedabad, used cars Ahmedabad, used vehicles Ahmedabad, contract hire Ahmedabad, long term car rental Ahmedabad, vehicle rental Gujarat, commercial vehicle rental Ahmedabad, taxi plated vehicles Gujarat, corporate fleet Ahmedabad, government fleet contractor Gujarat, ONGC vehicle contractor, BPCL fleet services, PSU vehicle provider India, GEOS Enterprises Ahmedabad',
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
