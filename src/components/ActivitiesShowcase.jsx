import { useHotels } from '../hooks/queries';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';
import HotelCard from './revamp/HotelCard';
import { SkeletonList } from './revamp/Skeletons';

const activities = [
  {
    title: 'Desert Safari & Quad Biking',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=75',
    link: '/activities/desert-safari',
    blurb: 'Dune bashing, camel rides & BBQ under the stars',
    badge: 'Best Seller',
    price: 2499,
  },
  {
    title: 'Scuba Diving & Snorkeling',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=75',
    link: '/activities/scuba-diving',
    blurb: 'Explore vibrant coral reefs & marine life',
    badge: 'Adventure',
    price: 4999,
  },
  {
    title: 'Dhow Cruise & Marina Dinner',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=75',
    link: '/activities/dhow-cruise',
    blurb: 'Sunset views, live music & gourmet dining',
    badge: 'Romantic',
    price: 1899,
  },
  {
    title: 'Theme Parks & Waterparks',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=75',
    link: '/activities/theme-parks',
    blurb: 'Burj Khalifa, Global Village & Aquaventure',
    badge: 'Family',
    price: 3299,
  },
  {
    title: 'Luxury Yacht Rental',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=75',
    link: '/activities/yacht-rental',
    blurb: 'Private charters on the Arabian Gulf',
    badge: 'Luxury',
    price: 8500,
  },
  {
    title: 'Houseboat & Backwater Cruise',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=75',
    link: '/activities/houseboat',
    blurb: "Kerala's serene backwaters & village life",
    badge: 'Trending',
    price: 5200,
  },
];

export default function ActivitiesShowcase() {
  const { data: hotels = [], isPending: loading } = useHotels({ limit: 6 });

  if (loading) {
    return (
      <section className="section-y bg-brand-canvas/50">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  // Interleave: activity, hotel, activity, hotel, ...
  const items = [];
  const maxLen = Math.max(activities.length, hotels.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < activities.length) items.push({ type: 'activity', data: activities[i], key: `act-${i}` });
    if (i < hotels.length) items.push({ type: 'hotel', data: hotels[i], key: `hotel-${hotels[i]._id || i}` });
  }

  return (
    <UniversalCarousel
      kicker="Stays & Experiences"
      title="Handpicked hotels & curated adventures"
      subtitle="Verified 4★+ stays and unforgettable experiences — everything your family needs in one place."
      bg="canvas"
      slidesPerViewDesktop={4}
    >
      {items.map((item) =>
        item.type === 'hotel' ? (
          <HotelCard
            key={item.key}
            hotel={item.data}
            size="default"
          />
        ) : (
          <UniversalCard
            key={item.key}
            image={item.data.image}
            imageAlt={item.data.title}
            kicker="Activity"
            title={item.data.title}
            subtitle={item.data.blurb}
            badge={item.data.badge}
            price={{ amount: item.data.price, from: true, perPerson: true }}
            cta={{ label: 'Enquire Now', style: 'button' }}
            href={item.data.link}
          />
        )
      )}
    </UniversalCarousel>
  );
}
