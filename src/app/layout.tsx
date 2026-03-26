import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { geosTheme } from '@/lib/muiTheme'
import { ReduxProvider } from '@/store/provider'
import { QueryProvider } from '@/lib/queryProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { MainWrapper } from '@/components/layout/MainWrapper'
import { SEO_DEFAULTS } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SEO_DEFAULTS.url),
  title: {
    default: SEO_DEFAULTS.title,
    template: '%s | GEOS Enterprises',
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  authors: [{ name: 'GEOS Enterprises' }],
  creator: 'GEOS Enterprises',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SEO_DEFAULTS.url,
    siteName: 'GEOS Enterprises',
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [{ url: SEO_DEFAULTS.ogImage, width: 1200, height: 630, alt: 'GEOS Enterprises — Corporate Fleet Logistics India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [SEO_DEFAULTS.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['AutoDealer', 'LocalBusiness'],
  name: 'GEOS Enterprises',
  alternateName: 'GEOS Ahmedabad',
  description: SEO_DEFAULTS.description,
  url: SEO_DEFAULTS.url,
  logo: `${SEO_DEFAULTS.url}/images/geos-logo-new.jpg`,
  image: `${SEO_DEFAULTS.url}/images/og-image.jpg`,
  telephone: '+91-92274-76900',
  email: 'geosenterprises@gmail.com',
  foundingDate: '1988',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '507 Aagam Avenue, Near Adani Gas Station, Motera Cross Road',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380005',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '23.0753',
    longitude: '72.5898',
  },
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: '₹₹',
  areaServed: [
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicle Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Rental Ahmedabad' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Long-Term Contract Hire' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Used Vehicle Sales Ahmedabad' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Fleet Provisioning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Government Fleet Services Gujarat' } },
    ],
  },
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={geosTheme}>
            <CssBaseline />
            <ReduxProvider>
              <QueryProvider>
                <UtilityBar />
                <Navbar />
                <MainWrapper>{children}</MainWrapper>
                <Footer />
                <MobileMenu />
              </QueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
