import { useHotels } from '../hooks/queries';
import UniversalCarousel from './revamp/UniversalCarousel';
import HotelCard from './revamp/HotelCard';
import { SkeletonList } from './revamp/Skeletons';

const HomeHotels = () => {
  const { data: hotels = [], isPending: loading } = useHotels({ limit: 12 });

  if (loading) {
    return (
      <section className="section-y bg-brand-canvas/50">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  if (hotels.length === 0) return null;

  return (
    <UniversalCarousel
      kicker="Verified stays"
      title="Handpicked hotels for families"
      subtitle="4★+ properties we've personally vetted — clean rooms, great food, family-friendly locations."
      bg="canvas"
      slidesPerViewDesktop={4}
    >
      {hotels.map((hotel, i) => (
        <HotelCard
          key={hotel._id || i}
          hotel={hotel}
          size="default"
        />
      ))}
    </UniversalCarousel>
  );
};

export default HomeHotels;
