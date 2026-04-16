'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  CheckCircle2,
} from 'lucide-react'
import { useCollections } from '@/hooks/use-collections'

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const HERO_IMAGE = '/media/placeholders/hero.jpg'
const LIFESTYLE_IMAGE = '/media/placeholders/lifestyle.jpg'

const FEATURED_CATEGORIES = [
  {
    label: 'Women',
    tag: 'New Season',
    href: '/collections',
    image: '/media/placeholders/product-1.jpg',
    position: 'object-top',
  },
  {
    label: 'Men',
    tag: 'Essentials',
    href: '/collections',
    image: '/media/placeholders/product-2.jpg',
    position: 'object-center',
  },
  {
    label: 'New Arrivals',
    tag: 'Just In',
    href: '/products?sort=newest',
    image: '/media/placeholders/product-3.jpg',
    position: 'object-center',
  },
  {
    label: 'Best Sellers',
    tag: 'Customer Favourites',
    href: '/products',
    image: '/media/placeholders/product-4.jpg',
    position: 'object-center',
  },
]

const TRUST_BADGES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over CHF 100',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Zürich, CH',
    rating: 5,
    text: 'The quality is absolutely exceptional. I ordered a blazer and it arrived perfectly pressed. The fit was exactly as described — this is my new go-to brand.',
    item: 'Tailored Linen Blazer',
  },
  {
    name: 'James T.',
    location: 'Geneva, CH',
    rating: 5,
    text: 'I was skeptical about online fashion at first, but ZC Fashion completely changed my mind. The fabrics feel premium, and the minimal aesthetic is exactly what I was looking for.',
    item: 'Slim-Fit Oxford Shirt',
  },
  {
    name: 'Amélie D.',
    location: 'Basel, CH',
    rating: 5,
    text: 'Every piece I have from ZC Fashion gets compliments. Clean design, perfect sizing, and shipping was faster than expected. Highly recommend!',
    item: 'Wide-Leg Trousers',
  },
]

const MARQUEE_ITEMS = [
  'New Collection SS25',
  'Free Shipping Over CHF 100',
  'Clean & Minimal Design',
  'Premium Quality Fabrics',
  'Easy 30-Day Returns',
  'New Collection SS25',
  'Free Shipping Over CHF 100',
  'Clean & Minimal Design',
  'Premium Quality Fabrics',
  'Easy 30-Day Returns',
]

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* ── MARQUEE STRIP ── */}
      <div className="bg-foreground text-background overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-[10px] font-medium tracking-[0.2em] uppercase px-8">
              {item}
              <span className="mx-8 opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-zinc-50 min-h-[85vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="ZC Fashion — Elevate Your Style"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
        </div>

        <div className="relative container-custom py-24 lg:py-36">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/50 mb-6 animate-fade-in">
              SS25 Collection
            </p>

            {/* Headline */}
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-foreground text-balance animate-fade-in-up">
              Elevate
              <br />
              <em className="not-italic font-normal">Your Style</em>
            </h1>

            <p className="mt-6 text-base text-foreground/60 max-w-sm leading-relaxed animate-fade-in-up">
              Timeless silhouettes. Premium fabrics. Effortless minimalism — for the modern wardrobe.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase hover:border-foreground transition-colors"
                prefetch={true}
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30">
          <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
          <div className="h-8 w-px bg-foreground/20" />
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Curated For You</p>
              <h2 className="font-heading text-4xl lg:text-5xl font-semibold tracking-tight">Shop By Category</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors group"
              prefetch={true}
            >
              View All
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group block" prefetch={true}>
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className={`object-cover ${cat.position} transition-transform duration-700 ease-out group-hover:scale-105`}
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-3">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/50 mb-0.5">{cat.tag}</p>
                      <p className="text-sm font-medium tracking-wide text-foreground">{cat.label}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL / LIFESTYLE BAND ── */}
      <section className="bg-zinc-900 py-20 lg:py-0 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Image */}
          <div className="relative min-h-[50vw] lg:min-h-0">
            <Image
              src={LIFESTYLE_IMAGE}
              alt="ZC Fashion — New Season"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-zinc-900/30" />
          </div>

          {/* Content */}
          <div className="flex items-center px-8 lg:px-20 py-20">
            <div className="max-w-md">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-6">New Season</p>
              <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
                Effortless Style
                <br />
                <em className="not-italic font-normal">for Every Moment</em>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-10">
                From morning meetings to weekend escapes — our SS25 collection is designed for the life you actually live. Premium fabrics, considered cuts, enduring style.
              </p>
              <Link
                href="/products?sort=newest"
                className="inline-flex items-center gap-3 bg-white text-zinc-900 px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-100 transition-colors"
                prefetch={true}
              >
                Discover Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS (Dynamic) ── */}
      {!isLoading && collections && collections.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Collections</p>
                <h2 className="font-heading text-4xl lg:text-5xl font-semibold tracking-tight">Featured Collections</h2>
              </div>
              <Link
                href="/collections"
                className="hidden sm:flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors group"
                prefetch={true}
              >
                All Collections
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((col: any) => (
                <Link key={col.id} href={`/collections/${col.handle}`} className="group block" prefetch={true}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-2xl font-semibold text-white">{col.title}</h3>
                      <p className="text-xs tracking-[0.12em] uppercase text-white/70 mt-1 flex items-center gap-2 group-hover:gap-3 transition-all">
                        Shop Collection <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST BADGES ── */}
      <section className="border-y border-zinc-100">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-zinc-100">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.title} className="flex items-center gap-5 justify-center md:px-10 first:pl-0 last:pr-0">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-zinc-200 rounded-full">
                    <Icon className="h-4.5 w-4.5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground tracking-wide">{badge.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-zinc-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">What Our Customers Say</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold tracking-tight">Loved by Thousands</h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">4.9 / 5 · 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div key={review.name} className="bg-white p-8 border border-zinc-100">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-foreground/70 leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>

                {/* Reviewer */}
                <div className="border-t border-zinc-50 pt-5">
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{review.location}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Verified purchase · {review.item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-24 bg-foreground">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-4">Exclusive Offers</p>
          <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-background mb-4">
            Get 10% Off Your First Order
          </h2>
          <p className="text-sm text-background/60 mb-10">
            Subscribe to our newsletter and receive early access to new collections, exclusive deals, and style inspiration.
          </p>

          {newsletterSubmitted ? (
            <div className="flex items-center justify-center gap-2 text-background/80">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">You&apos;re in! Check your inbox for your discount code.</span>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 text-background placeholder:text-background/40 px-4 py-3.5 text-sm focus:outline-none focus:border-background/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-background text-foreground px-8 py-3.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-background/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-[10px] tracking-wider uppercase text-background/30">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </>
  )
}
