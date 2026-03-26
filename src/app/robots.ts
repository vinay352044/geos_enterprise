import { MetadataRoute } from 'next'
import { SEO_DEFAULTS } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SEO_DEFAULTS.url}/sitemap.xml`,
    host: SEO_DEFAULTS.url,
  }
}
