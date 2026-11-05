import { usePremiumPackages } from '../hooks/queries';
import UniversalCarousel from './revamp/UniversalCarousel';
import PackageCard from './PackageCard';
import { SkeletonList } from './revamp/Skeletons';

const HomePremiumPackages = () => {
  const { data: packages = [], isPending: loading } = usePremiumPackages();

  if (loading) {
    return (
      <section className="section-y bg-brand-canvas/50">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <UniversalCarousel
      kicker="Premium escapes"
      title="4★ & 5★ Dubai packages"
      subtitle="Luxury stays with visa included — handpicked 4-star and 5-star properties for families."
      bg="canvas"
      slidesPerViewDesktop={4}
    >
      {packages.map((pkg, i) => (
        <PackageCard
          key={pkg._id || pkg.id || i}
          pkg={pkg}
          category={pkg.category}
          size="compact"
        />
      ))}
    </UniversalCarousel>
  );
};

export default HomePremiumPackages;
