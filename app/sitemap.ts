import type { MetadataRoute } from 'next'
import { servicePages } from '@/lib/service-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/compare', '/about', '/privacy', ...Object.keys(servicePages).map(slug => `/services/${slug}`)].map(path => ({ url: `https://www.topostitch.dev${path}` }))
}
