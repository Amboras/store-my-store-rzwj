'use client'

import Link from 'next/link'
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const shopLinks = [
  { label: 'All Products', href: '/products' },
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Collections', href: '/collections' },
  { label: 'Best Sellers', href: '/products' },
  { label: 'Sale', href: '/products' },
]

const helpLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track Order', href: '/account/orders' },
  { label: 'Size Guide', href: '/faq' },
]

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks: { label: string; href: string }[] = [
    { label: 'About ZC Fashion', href: '/about' },
  ]
  if (policies?.privacy_policy) companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy) companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy) companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="border-t border-zinc-100 bg-zinc-900 text-zinc-400">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="font-heading text-2xl font-bold tracking-[0.12em] uppercase text-white">
                ZC Fashion
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-8">
              Premium fashion for the modern wardrobe. Clean lines, considered fabrics, and timeless style — made to last.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mb-8">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-400 transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <a
              href="mailto:hello@zcfashion.com"
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              hello@zcfashion.com
            </a>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6">Shop</h3>
            <ul className="space-y-3.5">
              {shopLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6">Support</h3>
            <ul className="space-y-3.5">
              {helpLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-6">Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Payment icons */}
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'MC', 'Amex', 'PayPal'].map((pm) => (
                  <span
                    key={pm}
                    className="text-[9px] border border-zinc-700 text-zinc-600 px-2 py-1 tracking-wide"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} ZC Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-xs text-zinc-700">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
