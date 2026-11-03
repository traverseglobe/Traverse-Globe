import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Check, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import ImageWithFallback from './ImageWithFallback';
import HeartIcon from './HeartIcon';
import { CARD_BODY, CARD_LIFT, CARD_MEDIA, CARD_TITLE } from '@/lib/cardMetrics';

export default function HotelCard({ hotel, size = 'default' }) {
  const price = hotel.price;
  const original = hotel.originalPrice;
  const savings = original && price && original > price
    ? Math.round(((original - price) / original) * 100)
    : null;
  const savingsAmount = original && price && original > price ? original - price : null;

  const to = `/hotels/${hotel.category}/${hotel.slug?.current || ''}`;

  const shortlistItem = {
    id: `hotel:${hotel._id || hotel.slug?.current}`,
    type: 'hotel',
    title: hotel.name,
    price,
    image: hotel.image,
    slug: hotel.slug?.current,
    category: hotel.category,
    href: to,
  };

  const isLarge = size === 'large';
  const amenities = hotel.amenities || [];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group h-full flex flex-col rounded-2xl overflow-hidden bg-surface border transition-shadow duration-300',
        CARD_LIFT,
        isLarge ? 'border-brand-orange/30 ring-1 ring-brand-orange/10' : 'border-brand-hairline'
      )}
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden', CARD_MEDIA)}>
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

        {savingsAmount > 0 && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-poppins font-bold px-2.5 py-1 rounded-lg shadow-soft-md tracking-tight uppercase">
            SAVE ₹{savingsAmount.toLocaleString('en-IN')}
          </div>
        )}

        <div className="absolute top-3 right-3">
          <HeartIcon item={shortlistItem} size="md" />
        </div>
      </div>

      {/* Body */}
      <div className={cn('flex flex-col flex-grow', CARD_BODY)}>
        {/* Location + Star rating */}
        <div className="flex items-center justify-between gap-2 text-xs font-poppins text-brand-muted-ink mb-1">
          {hotel.location && (
            <span className="inline-flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
              <span className="truncate">{hotel.city ? `${hotel.city}${hotel.country ? `, ${hotel.country}` : ''}` : hotel.location}</span>
            </span>
          )}
          {hotel.rating > 0 && (
            <span className="inline-flex items-center gap-0.5 shrink-0">
              {Array.from({ length: Math.min(hotel.rating, 5) }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              ))}
            </span>
          )}
        </div>

        {/* Review rating */}
        {hotel.reviewRating > 0 && (
          <div className="flex items-center gap-1 text-xs font-poppins mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span className="font-semibold text-brand-ink">{hotel.reviewRating.toFixed(1)}</span>
            {hotel.reviewCount > 0 && (
              <span className="text-brand-muted-ink">({hotel.reviewCount})</span>
            )}
          </div>
        )}

        {/* Hotel name */}
        <h3 className={cn(CARD_TITLE, 'text-brand-ink mb-2')}>
          {hotel.name}
        </h3>

        {/* Amenities grid (up to 6, 2 columns) */}
        {amenities.length > 0 && (
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
            {amenities.slice(0, 6).map((item, idx) => (
              <span key={idx} className="inline-flex items-start gap-1 text-[11px] text-brand-ink font-canva-sans leading-tight">
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </span>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto pt-2 border-t border-brand-hairline">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            {typeof original === 'number' && original > (price || 0) && (
              <span className="text-xs text-brand-muted-ink line-through font-canva-sans">
                ₹{original.toLocaleString('en-IN')}
              </span>
            )}
            {savings > 0 && (
              <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-poppins font-semibold px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
                SAVE {savings}%
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            {price > 0 ? (
              <span className="text-lg md:text-xl font-bold font-poppins text-brand-ink leading-none">
                ₹{price.toLocaleString('en-IN')}
                <span className="text-xs text-brand-muted-ink font-normal ml-1 font-canva-sans">/ night</span>
              </span>
            ) : (
              <span className="text-sm text-brand-muted-ink font-canva-sans">Contact for rates</span>
            )}
          </div>

          {/* CTAs: Call + View Hotel */}
          <div className="mt-2.5 flex items-center gap-2">
            <a
              href={`tel:${typeof window !== 'undefined' ? '' : ''}043035888`}
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors shadow-soft-sm hover:shadow-glow-orange"
              aria-label={`Call about ${hotel.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              to={to}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-[13px] font-poppins font-semibold bg-brand-orange hover:bg-brand-orange-hover text-white transition-colors shadow-soft-md hover:shadow-glow-orange"
            >
              View Hotel
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
