'use client'

import { useEffect } from 'react'
import { capturePostHogEvent } from '@/lib/posthog-events'

export default function ArticleEngagement({ slug }: { slug: string }) {
  useEffect(() => {
    capturePostHogEvent('insight_article_viewed', { article_slug: slug })
    let engagedSeconds = 0
    let engagedSent = false
    let readSent = false
    const tick = () => {
      if (document.visibilityState === 'visible') engagedSeconds += 1
      if (!engagedSent && engagedSeconds >= 30) {
        engagedSent = true
        capturePostHogEvent('insight_article_engaged', { article_slug: slug, engaged_seconds: 30 })
      }
    }
    const onScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight
      if (!readSent && range > 0 && window.scrollY / range >= 0.6) {
        readSent = true
        capturePostHogEvent('insight_article_read', { article_slug: slug, scroll_depth_percent: 60 })
      }
    }
    const timer = window.setInterval(tick, 1000)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [slug])
  return null
}
