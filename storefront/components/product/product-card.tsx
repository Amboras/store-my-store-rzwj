import Image from 'next/image'
import Link from 'next/link'
import { getProductImage } from '@/lib/utils/placeholder-images'
import ProductPrice, { isProductSoldOut, type VariantExtension } from './product-price'

interface ProductCardProps {
  product: any
  variantExtensions?: Record<string, VariantExtension>
}

export default function ProductCard({ product, variantExtensions }: ProductCardProps) {
  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price

  const currency = calculatedPrice?.currency_code || 'usd'
  const currentAmount = calculatedPrice?.calculated_amount
  const ext = variant?.id ? variantExtensions?.[variant.id] : null

  const soldOut = isProductSoldOut(product.variants || [], variantExtensions)

  return (
    <Link href={`/products/${product.handle}`} className="group block" prefetch={true}>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <Image
          src={getProductImage(product.thumbnail, product.id)}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${soldOut ? 'opacity-60' : ''}`}
        />

        {/* Badge overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {soldOut && (
            <span className="bg-foreground text-background text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1">
              Sold Out
            </span>
          )}
          {ext?.compare_at_price && !soldOut && (
            <span className="bg-red-600 text-white text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Quick Add overlay on hover */}
        {!soldOut && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="bg-foreground/95 text-background text-[10px] font-medium tracking-[0.18em] uppercase py-3.5 text-center">
              View Product
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1.5">
        {product.subtitle && (
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{product.subtitle}</p>
        )}
        <h3 className={`text-sm font-medium tracking-wide leading-snug ${soldOut ? 'text-muted-foreground' : 'text-foreground'}`}>
          {product.title}
        </h3>
        <ProductPrice
          amount={currentAmount}
          currency={currency}
          compareAtPrice={ext?.compare_at_price}
          soldOut={soldOut}
          size="card"
        />
      </div>
    </Link>
  )
}
