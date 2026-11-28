import { Star, Clock, PhoneCall, ArrowRight, Check, Sparkles, Gem, Hotel, Car, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';
import { useOffers } from '../../hooks/queries';
import ImageWithFallback from './ImageWithFallback';
import ShimmerButton from '../magicui/ShimmerButton';

/**
 * SalesBanner — premium promotional band on the homepage.
 *
 * No coupon system: instead of a promo code, the card states that seasonal
 * savings are auto-applied ("No Promo Code Needed"). The discount line and the
 * background image stay CMS-overridable via useOffers(); the rest of the copy
 * is fixed marketing content so the layout matches the approved design.
 *
 * Layout: both columns stretch to the same height. The left column spreads its
 * three groups (intro / CTAs / benefit strip) top-to-bottom with justify-between,
 * and the card pins its footnote to the bottom, so the two columns line up on the
 * same top and bottom edges with no empty gap.
 *
 * GOLD is a banner-local accent only (headline flourish, FLASH DISCOUNT pill,
 * savings callout) — not a global theme token.
 */
const GOLD = '#e7c988';

export default function SalesBanner() {
  const { data: offers = [] } = useOffers(1);
  const activeOffer = offers[0] || null;

  const discountText = activeOffer?.discount || 'UP TO 35% OFF';
  const bgImage =
    activeOffer?.image ||
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80';
  const dealLink = activeOffer?.link || '/packages';
  const telHref = `tel:${companyInfo.phone.primary.replace(/\s/g, '')}`;

  const waText = encodeURIComponent(
    `Hi Traverse Globe! I'm interested in your ${discountText} Dubai holiday offer — please share the best deals.`
  );
  const waUrl = `https://wa.me/${companyInfo.phone.whatsapp}?text=${waText}`;

  const miniBenefits = [
    { icon: Star, label: 'Handpicked Stays' },
    { icon: Check, label: 'All-Inclusive' },
    { icon: Sparkles, label: '24/7 Support' },
    { icon: Gem, label: 'Zero Booking Fees' },
  ];

  const cardRows = [
    { icon: Hotel, label: 'Handpicked Premium Hotels' },
    { icon: Car, label: 'Private Transfers & Excursions' },
    { icon: ShieldCheck, label: '100% Customized Itineraries' },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="relative overflow-hidden shadow-soft-xl bg-brand-scrim">
        {/* Background image + dark overlay (kept subtle so the band reads near-dark) */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={bgImage}
            alt="Dubai holiday offer"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-scrim via-brand-scrim/95 to-brand-scrim/85" />
          <div className="absolute -right-32 -top-24 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />
          <div
            className="absolute -left-24 -bottom-28 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgba(231,201,136,0.08)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-7 md:py-9 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left column: three groups spread top-to-bottom */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-7">
            {/* Group 1 — intro */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-poppins font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-glow-orange">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Limited Time Offer
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/80 text-xs font-poppins px-3 py-1.5 rounded-full border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  Valid for bookings this month
                </span>
              </div>

              <h3 className="font-season text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-4">
                Mega Holiday Season Sale —<br />
                <span className="italic" style={{ color: GOLD }}>Dubai Escapes</span>
              </h3>

              <p className="text-white/80 font-canva-sans text-sm md:text-base max-w-xl mb-0">
                Book handpicked Dubai itineraries with all-inclusive transparent pricing, handpicked
                hotels, and dedicated 24/7 on-ground concierge.
              </p>
            </div>

            {/* Group 2 — calls to action */}
            <div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <ShimmerButton as="a" href={telHref} borderRadius="0.75rem" className="px-6 py-3.5 text-sm">
                  <PhoneCall className="w-4 h-4" />
                  Claim Deal via Call
                </ShimmerButton>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3.5 rounded-xl font-poppins font-medium text-sm shadow-soft-md transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp Concierge
                </a>
              </div>

              <a
                href={dealLink}
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-brand-orange font-poppins text-sm font-semibold transition-colors mt-4 w-fit"
              >
                View All Packages <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Group 3 — mini benefit strip (bottom) */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {miniBenefits.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-white/85 font-poppins text-sm">
                  <Icon className="w-4 h-4 text-brand-orange" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: offer card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/15 p-6 md:p-7 flex flex-col shadow-soft-xl">
              <div className="flex justify-center mb-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-[11px] font-poppins font-semibold tracking-widest uppercase"
                  style={{ color: GOLD, border: `1px solid ${GOLD}55` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                  Flash Discount
                </span>
              </div>

              <div className="text-center text-4xl md:text-5xl font-poppins font-black text-white tracking-tight mb-5">
                {discountText}
              </div>

              {/* Savings callout — replaces the old coupon code */}
              <div
                className="rounded-xl px-4 py-3 text-center mb-4"
                style={{ border: `1px solid ${GOLD}40`, backgroundColor: 'rgba(231,201,136,0.07)' }}
              >
                <div className="flex items-center justify-center gap-2 font-poppins font-semibold text-sm" style={{ color: GOLD }}>
                  <Check className="w-4 h-4" strokeWidth={3} />
                  Direct Seasonal Savings Applied
                </div>
                <p className="text-white/60 text-xs font-canva-sans mt-1">
                  Auto-Applied at Booking • No Promo Code Needed
                </p>
              </div>

              {/* Feature rows */}
              <ul className="space-y-2.5">
                {cardRows.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-sm font-poppins font-medium text-white/90"
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-3 mt-auto">
                <p className="text-center text-[11px] text-white/45 font-canva-sans">
                  *Applicable on customized family &amp; couple holiday packages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
