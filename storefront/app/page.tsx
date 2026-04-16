'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  FlaskConical,
  Leaf,
  Award,
  CheckCircle2,
  ChevronRight,
  Zap,
  HeartPulse,
  Brain,
  Moon,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80'

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '3rd-Party', label: 'Lab Tested' },
  { value: 'GMP', label: 'Certified Facility' },
]

const benefits = [
  {
    icon: FlaskConical,
    title: 'Science-Backed Formulas',
    description: 'Every ingredient is dosed based on clinical research — nothing underdosed, nothing proprietary-blended.',
  },
  {
    icon: Leaf,
    title: 'Clean & Transparent',
    description: 'No fillers, artificial colors, or unnecessary additives. Just pure, effective ingredients.',
  },
  {
    icon: Award,
    title: 'Third-Party Tested',
    description: 'Every batch is independently verified for purity, potency, and safety before it ships to you.',
  },
]

const categories = [
  {
    icon: Zap,
    title: 'Energy & Performance',
    description: 'Fuel your day with sustained energy and peak output.',
    href: '/products',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    icon: HeartPulse,
    title: 'Heart & Immunity',
    description: 'Comprehensive support for your cardiovascular and immune system.',
    href: '/products',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    icon: Brain,
    title: 'Focus & Cognition',
    description: 'Sharpen mental clarity, memory, and cognitive endurance.',
    href: '/products',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  {
    icon: Moon,
    title: 'Sleep & Recovery',
    description: 'Deeper sleep, faster muscle recovery, and stress relief.',
    href: '/products',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
  },
]

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
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="VitaCore Health Supplements"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="relative container-custom py-24 lg:py-36">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-teal-300 text-xs font-semibold uppercase tracking-widest mb-8">
              <FlaskConical className="h-3.5 w-3.5" />
              Clinically Formulated Supplements
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.08] tracking-tight text-balance">
              Your Health,
              <br />
              <span className="text-teal-400">Backed by Science.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
              Premium supplements formulated with clinically effective doses. No proprietary blends. No compromises. Just results you can feel.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Shop All Supplements
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors rounded-sm"
                prefetch={true}
              >
                Our Science
              </Link>
            </div>

            {/* Trust micro-signals */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                'GMP Certified Facility',
                'Third-Party Lab Tested',
                '30-Day Money-Back Guarantee',
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-teal-700">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold font-heading text-white">{stat.value}</p>
                <p className="text-xs text-teal-200 mt-1 uppercase tracking-widest font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-teal-700 font-semibold mb-3">Shop by Goal</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              What Are You Working Toward?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all duration-200"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${cat.color} mb-4`}>
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">{cat.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:gap-2 transition-all">
                    Shop Now <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS (dynamic) ── */}
      {isLoading ? (
        <section className="py-20">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── WHY VITACORE ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                <Image
                  src={LIFESTYLE_IMAGE}
                  alt="VitaCore Lab & Quality"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl border border-slate-100 p-5 max-w-[200px]">
                <p className="text-2xl font-bold font-heading text-teal-700">100%</p>
                <p className="text-xs text-slate-600 font-medium mt-1">Label Accuracy Verified by Independent Labs</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-teal-700 font-semibold mb-3">Why Choose VitaCore</p>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 leading-tight">
                  The Standard Others Should Follow
                </h2>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  We built VitaCore because we were tired of underdosed supplements hiding behind proprietary blends. Every formula we make is fully transparent, clinically dosed, and independently tested.
                </p>
              </div>

              <div className="space-y-5">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div key={benefit.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-slate-900 text-sm">{benefit.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:gap-3 transition-all"
              >
                Read Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="container-custom py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-slate-200">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-teal-50 flex items-center justify-center">
                <Truck className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Free Shipping</p>
                <p className="text-xs text-slate-500">On all orders over $60</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:pl-8">
              <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-teal-50 flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">30-Day Guarantee</p>
                <p className="text-xs text-slate-500">Full refund, no questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:pl-8">
              <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-teal-50 flex items-center justify-center">
                <Shield className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Secure Checkout</p>
                <p className="text-xs text-slate-500">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-24 bg-gradient-to-br from-teal-800 to-teal-950">
        <div className="container-custom max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-700/60 border border-teal-500/40 px-4 py-1.5 text-teal-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Mail className="h-3.5 w-3.5" />
            Stay Informed
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
            Health Tips & Exclusive Deals
          </h2>
          <p className="mt-3 text-teal-200 text-base">
            Join 50,000+ health-conscious subscribers. Get science-backed wellness tips and exclusive early access to new formulas.
          </p>

          {newsletterSubmitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-teal-300 font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              You&apos;re on the list! Welcome to VitaCore.
            </div>
          ) : (
            <form className="mt-8 flex gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-teal-300/60 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors rounded-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-teal-400">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}

function Mail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
