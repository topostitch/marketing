import type { MetadataRoute } from 'next'
import { servicePages } from '@/lib/service-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/about', '/privacy', '/learn', '/stories', ...Object.keys(servicePages).map(slug => `/services/${slug}`)].map(path => ({ url: `https://www.topostitch.dev${path}` }))
}
