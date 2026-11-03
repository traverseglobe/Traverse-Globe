import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Phone, ShieldCheck, Clock, Award } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import Kicker from './revamp/Kicker';
import SectionRule from './revamp/SectionRule';

const Globe = lazy(() => import('@/components/magicui/Globe'));

const GLOBE_PLACEHOLDER = (
  <div
    className="mx-auto aspect-square w-full max-w-[460px] animate-pulse rounded-full border border-brand-hairline bg-teal/5 ring-1 ring-inset ring-teal/10"
    aria-hidden="true"
  />
);

function useNearViewportIdle(ref, rootMargin = '200px') {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || ready) return undefined;
    let idleId = 0;
    let timeoutId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 200);
      }
    }, { rootMargin });
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [ref, rootMargin, ready]);
  return ready;
}

/**
 * WhyChooseUs — REVAMP_PLAN §3 #8, #14, #15 & §4.4
 * - Left column: 5-10 crisp lines of Dubai focus copy + guarantees + orange Call CTA
 * - Right column: Engaging Scuba / Adventure video player with poster fallback
 */
export default function WhyChooseUs() {
  const globeRef = useRef(null);
  const showGlobe = useNearViewportIdle(globeRef);

  return (
    <section className="section-y bg-brand-canvas/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Dubai copy + Guarantees + Call CTA (7/12) */}
          <div className="lg:col-span-7">
            <Kicker tone="orange" size="sm" className="mb-2">
              The Traverse Globe Promise
            </Kicker>
            <SectionRule className="mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-brand-ink mb-4 leading-tight">
              Why Travel With {companyInfo.name}?
            </h2>

            {/* Refined 5–10 crisp lines of high-impact copy */}
            <p className="text-brand-ink/80 leading-relaxed text-sm md:text-base font-canva-sans mb-3">
              At {companyInfo.name}, we specialize in authentic, tailor-made Dubai &amp; global travel experiences. From private desert safaris across golden dunes to luxury marina yacht cruises and all-inclusive family theme park escapes, our local ground presence ensures true insider rates with zero hidden charges.
            </p>
            <p className="text-brand-ink/80 leading-relaxed text-sm md:text-base font-canva-sans mb-6">
              Every itinerary is customized to your pace with handpicked 4-star+ hotels, transparent pricing, and 24/7 dedicated on-ground concierge support throughout your journey.
            </p>

            {/* Guarantee Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  Best Price Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  24/7 On-Ground Care
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-surface px-4 py-3 rounded-xl border border-brand-hairline shadow-soft-sm">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-brand-ink font-poppins">
                  Verified Local Guides
                </span>
              </div>
            </div>

            {/* Direct Call CTA Button */}
            <div>
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="inline-flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white px-7 py-3.5 rounded-xl font-poppins font-semibold text-sm md:text-base shadow-glow-orange transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                Call an Expert Now
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Globe (5/12) */}
          <div className="lg:col-span-5">
            <div ref={globeRef} className="relative mx-auto w-full max-w-[460px]">
              {showGlobe ? (
                <Suspense fallback={GLOBE_PLACEHOLDER}>
                  <Globe className="mx-auto px-0" activeRoute="dxb" />
                </Suspense>
              ) : (
                GLOBE_PLACEHOLDER
              )}
              <p className="mt-2 text-center font-canva-sans text-xs text-brand-muted-ink">
                Drag to explore · scroll or pinch to zoom
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
