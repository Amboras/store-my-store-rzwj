'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

const NAV_LINKS = [
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Women', href: '/collections' },
  { label: 'Men', href: '/collections' },
  { label: 'Best Sellers', href: '/products' },
  { label: 'Sale', href: '/products', highlight: true },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-zinc-100 shadow-sm'
            : 'bg-white border-b border-zinc-100'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-60 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading text-2xl font-bold tracking-[0.12em] uppercase text-foreground">
                ZC Fashion
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-medium tracking-[0.1em] uppercase transition-colors ${
                    link.highlight
                      ? 'text-red-600 hover:text-red-500'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              {collections?.slice(0, 0).map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-xs font-medium tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground transition-colors"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/search"
                className="p-2.5 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-60 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn
                  ? <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  : <LogIn className="h-[18px] w-[18px]" strokeWidth={1.75} />
                }
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-60 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-[280px] bg-white animate-slide-in-right flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <span className="font-heading text-xl font-bold tracking-[0.12em] uppercase">ZC Fashion</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 hover:opacity-60 transition-opacity"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3.5 text-sm font-medium tracking-[0.08em] uppercase border-b border-zinc-50 transition-colors ${
                    link.highlight ? 'text-red-600' : 'text-foreground hover:text-foreground/60'
                  }`}
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              {collections?.map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3.5 text-sm font-medium tracking-[0.08em] uppercase border-b border-zinc-50 text-foreground hover:text-foreground/60 transition-colors"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-zinc-100 space-y-3">
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
