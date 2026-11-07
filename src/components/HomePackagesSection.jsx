import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { useHomepagePackages } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import Kicker from './revamp/Kicker';
import SectionRule from './revamp/SectionRule';
import PackageCard from './PackageCard';
import { useRail } from '../hooks/useRail';

export default function HomePackagesSection() {
  const { data: packages = [], isPending } = useHomepagePackages(20);

  const scrollerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);
  const { trackRef, barRef } = useRail(scrollerRef);

  if (isPending) {
    return (
      <section className="section-y bg-brand-canvas/50">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  const shown = packages.slice(0, 4);
  if (shown.length === 0) return null;

  return (
    <section className="section-y bg-brand-canvas/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="max-w-2xl">
            <Kicker tone="orange" size="sm" className="mb-2">
              Popular Getaways
            </Kicker>
            <SectionRule className="mb-3" />
            <h2 className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-brand-ink leading-tight">
              Trending Holiday Packages
            </h2>
            <p className="mt-2 text-sm md:text-base font-canva-sans text-brand-muted-ink">
              Handpicked family holidays with verified stays, real prices, and 24/7 on-ground support.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-poppins font-semibold text-brand-orange hover:text-brand-orange-hover hover:gap-2 transition-[gap,color] self-start md:self-end"
          >
            <span>See more packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Rail on mobile, grid from md up */}
        <div
          ref={scrollerRef}
          className="-mx-4 px-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 cursor-grab md:cursor-auto [&[data-dragging]]:cursor-grabbing md:mx-0 md:px-0 md:overflow-visible md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <motion.div
            ref={trackRef}
            className="flex gap-4 will-change-transform md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5"
            variants={parent}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
          >
            {shown.map((pkg, i) => (
              <motion.div
                key={pkg._id || pkg.id || i}
                variants={item}
                className="shrink-0 w-[78%] sm:w-[48%] snap-start md:w-auto md:shrink"
              >
                <PackageCard pkg={pkg} category={pkg.category} size="compact" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile drag affordance */}
        <div className="mt-5 h-1 rounded-full bg-brand-hairline overflow-hidden md:hidden" aria-hidden="true">
          <div ref={barRef} className="h-full w-1/3 rounded-full bg-brand-orange" />
        </div>

        {/* See More CTA button — centered below cards */}
        <div className="mt-8 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange text-white font-poppins font-semibold text-sm hover:bg-brand-orange-hover transition-colors shadow-soft-md hover:shadow-soft-xl"
          >
            <Package className="w-4 h-4" />
            Explore All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
