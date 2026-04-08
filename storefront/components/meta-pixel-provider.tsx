'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent } from '@/lib/cookie-consent'
import {
  fetchMetaPixelConfig,
  getMetaPixelConfig,
  initMetaPixel,
  onMetaPixelReady,
  trackMetaPageView,
} from '@/lib/meta-pixel'

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let isMounted = true
    let unsubscribe = () => {}

    const bootstrap = async () => {
      if (!hasAnalyticsConsent()) {
        return
      }

      const existingConfig = getMetaPixelConfig()
      if (existingConfig && initMetaPixel(existingConfig)) {
        if (isMounted) setIsInitialized(true)
        return
      }

      try {
        const config = await fetchMetaPixelConfig()
        if (!config) return

        const ready = initMetaPixel(config)
        if (ready && isMounted) {
          setIsInitialized(true)
        }
      } catch {
        // Meta pixel should never break the storefront experience
      }
    }

    bootstrap()
    unsubscribe = onMetaPixelReady(() => {
      if (isMounted) setIsInitialized(true)
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!hasAnalyticsConsent()) return
    if (!isInitialized) return

    trackMetaPageView(pathname)
  }, [isInitialized, pathname])

  return <>{children}</>
}
