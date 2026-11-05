import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import { resolveImageUrl } from '@/lib/sanityImage';
import { useCustomerPhotos, useCustomerVideosByRole } from '@/hooks/queries';
import { SkeletonList } from './Skeletons';
import ImageWithFallback from './ImageWithFallback';
import Kicker from './Kicker';
import SectionRule from './SectionRule';
import { cn } from '@/lib/utils';
import { useRail } from '@/hooks/useRail';

const TAB_SPRING = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };
const TABS = [
  { value: 'all', label: 'All' },
  { value: 'photo', label: 'Photos' },
  { value: 'video', label: 'Videos' },
];

function VideoTile({ item }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <div
      className={cn(
        'group relative snap-start overflow-hidden rounded-2xl shadow-soft-sm hover:shadow-soft-lg transition-shadow cursor-pointer',
        item.tall ? 'row-span-2' : 'row-span-1'
      )}
      onClick={!playing ? handlePlay : undefined}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.image || undefined}
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          {item.image ? (
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1220] via-[#162033] to-[#1a1a2e]">
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,91,4,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(7,80,86,0.4) 0%, transparent 50%)',
                }}
              />
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgb(var(--c-scrim)/0.92) 0%, rgb(var(--c-scrim)/0.75) 35%, rgb(var(--c-scrim)/0.25) 70%, rgb(var(--c-scrim)/0.05) 100%)',
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white/90 text-brand-orange shadow-soft-md group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </span>
          </span>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none">
        <h3 className="font-poppins font-bold text-base leading-tight line-clamp-2 text-white">{item.title}</h3>
        {item.subtitle && (
          <p className="mt-0.5 text-xs text-white/80 font-canva-sans line-clamp-1">{item.subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function MediaGallery() {
  const [active, setActive] = useState('all');
  const reduceMotion = useReducedMotion();
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);
  const scrollerRef = useRef(null);
  const { trackRef, barRef } = useRail(scrollerRef);

  const { data: photos = [], isPending: photosLoading } = useCustomerPhotos(30);
  const { data: videos = [], isPending: videosLoading } = useCustomerVideosByRole('testimonial', 50);

  const items = useMemo(() => {
    const photoItems = photos.map((p, i) => ({
      id: p._id || `photo-${i}`,
      type: 'photo',
      title: p.caption || p.destination || 'Trip moment',
      subtitle: p.customerName,
      image: p.photo,
      tall: i % 5 === 0,
    }));

    const videoItems = videos.map((v, i) => ({
      id: v._id || `video-${i}`,
      type: 'video',
      title: v.title || v.destination || 'Trip video',
      subtitle: v.customerName,
      image: v.poster ? resolveImageUrl(v.poster, { width: 480 }) : '',
      videoUrl: v.videoUrl,
      tall: i % 3 === 0,
    }));

    if (active === 'photo') return photoItems;
    if (active === 'video') return videoItems;

    const merged = [];
    let pi = 0, vi = 0;
    while (pi < photoItems.length || vi < videoItems.length) {
      if (pi < photoItems.length) merged.push(photoItems[pi++]);
      if (pi < photoItems.length) merged.push(photoItems[pi++]);
      if (vi < videoItems.length) merged.push(videoItems[vi++]);
    }
    return merged;
  }, [photos, videos, active]);

  const isPending = photosLoading || videosLoading;

  if (isPending) {
    return (
      <section className="section-y bg-brand-canvas-2/65">
        <div className="container-custom">
          <SkeletonList count={6} columns={3} />
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="section-y overflow-hidden bg-brand-canvas-2/65">
      <div className="container-custom">
        <div className="mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            className="max-w-2xl"
            variants={parent}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
          >
            <motion.div variants={item}>
              <Kicker className="mb-3 block">Real trips, real families</Kicker>
            </motion.div>
            <motion.div variants={item}>
              <SectionRule className="mb-4" />
            </motion.div>
            <motion.h2 variants={item} className="font-poppins font-bold text-h2 text-brand-ink leading-tight">
              Moments from our travellers
            </motion.h2>
            <motion.p variants={item} className="mt-2 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
              Photos and videos shared by families who travelled with us — no stock images, no filters.
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap gap-2 shrink-0" role="tablist" aria-label="Filter media">
            {TABS.map((t) => {
              const isActive = active === t.value;
              return (
                <motion.button
                  key={t.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActive(t.value);
                    scrollerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
                  }}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                  transition={TAB_SPRING}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-poppins font-medium border transition-colors duration-200',
                    isActive
                      ? 'border-brand-orange text-white'
                      : 'bg-surface text-brand-ink border-brand-hairline hover:border-brand-orange/50 hover:text-brand-orange'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : 'mediaTabPill'}
                      className="absolute inset-0 rounded-full bg-brand-orange shadow-glow-orange"
                      transition={TAB_SPRING}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className={cn(
            'rail-bleed overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2',
            'cursor-grab [&[data-dragging]]:cursor-grabbing',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          )}
        >
          <div
            ref={trackRef}
            className="grid grid-flow-col auto-cols-[minmax(230px,1fr)] grid-rows-2 gap-4 md:auto-cols-[minmax(260px,1fr)] will-change-transform"
            style={{ gridTemplateRows: 'repeat(2, 170px)' }}
          >
            {items.map((mediaItem) =>
              mediaItem.type === 'video' ? (
                <VideoTile key={mediaItem.id} item={mediaItem} />
              ) : (
                <div
                  key={mediaItem.id}
                  className={cn(
                    'group relative snap-start overflow-hidden rounded-2xl shadow-soft-sm hover:shadow-soft-lg transition-shadow',
                    mediaItem.tall ? 'row-span-2' : 'row-span-1'
                  )}
                >
                  <ImageWithFallback
                    src={mediaItem.image}
                    alt={mediaItem.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(to top, rgb(var(--c-scrim)/0.92) 0%, rgb(var(--c-scrim)/0.75) 35%, rgb(var(--c-scrim)/0.25) 70%, rgb(var(--c-scrim)/0.05) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-poppins font-bold text-base leading-tight line-clamp-2 text-white">{mediaItem.title}</h3>
                    {mediaItem.subtitle && (
                      <p className="mt-0.5 text-xs text-white/80 font-canva-sans line-clamp-1">— {mediaItem.subtitle}</p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="container-custom mt-5">
        <div className="h-1 rounded-full bg-brand-hairline overflow-hidden" aria-hidden="true">
          <div ref={barRef} className="h-full w-1/3 rounded-full bg-brand-orange" />
        </div>
      </div>
    </section>
  );
}
