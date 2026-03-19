import { MetadataRoute } from 'next'
import { vehicles } from '@/data/vehicles'
import { marketplaceListings } from '@/data/marketplace'
import { SEO_DEFAULTS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO_DEFAULTS.url

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/fleet`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/marketplace`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${base}/fleet/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const marketplacePages: MetadataRoute.Sitemap = marketplaceListings.map((l) => ({
    url: `${base}/marketplace/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...vehiclePages, ...marketplacePages]
}
