'use client'

import { useState } from 'react'
import { X, Truck } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-teal-700 text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm tracking-wide font-medium">
        <Truck className="h-3.5 w-3.5 flex-shrink-0" />
        <p>Free shipping on orders over $60 &mdash; Use code <span className="font-bold underline underline-offset-2">FIRSTORDER</span> for 15% off</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
