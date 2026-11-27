'use client'

import Link, { type LinkProps } from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { capturePostHogEvent } from '@/lib/posthog-events'

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  eventName?: string
  eventLabel: string
}

export default function TrackedLink({ children, eventName = 'service_cta_clicked', eventLabel, onClick, ...props }: Props) {
  return <Link {...props} onClick={event => {
    onClick?.(event)
    capturePostHogEvent(eventName, { label: eventLabel, target_path: typeof props.href === 'string' ? props.href.split('?')[0] : 'internal' })
  }}>{children}</Link>
}
