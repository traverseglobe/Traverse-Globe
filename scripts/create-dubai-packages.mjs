/**
 * Create 18 Dubai packages in Sanity CMS
 *
 * Matrix: 3 durations (3N, 4N, 5N) × 3 hotel tiers (3★, 4★, 5★) × 2 visa options
 *
 * Pricing from the internal rate sheet (AED × 26 → INR, with-visa ×1.12 / without-visa ×1.10, strike ×1.10).
 * 5N 4★/5★ corrected: original sheet copied 4N totals — Abu Dhabi City Tour (100 AED) was missing.
 *
 * Run:  node scripts/create-dubai-packages.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN,
});

// ── Images ──────────────────────────────────────────────────────────

const BANNER_IMAGES = {
  '3n': 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg',
  '4n': 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg',
  '5n': 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
};

const GALLERY_IMAGES = [
  'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg',
  'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg',
  'https://images.pexels.com/photos/1703314/pexels-photo-1703314.jpeg',
  'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg',
  'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg',
  'https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg',
];

// ── AED Pricing (from rate sheet) ───────────────────────────────────

const AED_RATE = 26;

// AED totals: { duration: { star: aedTotal } }
// 5N 4★/5★ corrected by adding Abu Dhabi City Tour (100 AED) to 4N values
const AED_WITH_VISA = {
  '3n': { 3: 1205, 4: 1280, 5: 1392.5 },
  '4n': { 3: 1370, 4: 1445, 5: 1557.5 },
  '5n': { 3: 1470, 4: 1545, 5: 1657.5 },
};

const AED_WITHOUT_VISA = {
  '3n': { 3: 930, 4: 1005, 5: 1117.5 },
  '4n': { 3: 1095, 4: 1170, 5: 1282.5 },
  '5n': { 3: 1195, 4: 1270, 5: 1382.5 },
};

function computePrice(aed, withVisa) {
  const base = aed * AED_RATE;
  const markup = withVisa ? 1.12 : 1.10;
  const price = Math.round(base * markup);
  const strike = Math.round(price * 1.10);
  return { price, strikePrice: strike };
}

// ── Hotel info per star tier ────────────────────────────────────────

const HOTEL_INFO = {
  3: {
    title: '3-Star Hotel',
    options: ['Standard Room', 'Daily Breakfast', 'Free WiFi', 'Air Conditioning'],
    note: 'Clean, comfortable 3-star properties in Deira or Bur Dubai — close to metro and malls.',
  },
  4: {
    title: '4-Star Hotel',
    options: ['Deluxe Room', 'Daily Breakfast', 'Swimming Pool', 'Fitness Centre', 'Free WiFi'],
    note: 'Well-rated 4-star hotels near Dubai Marina or Downtown — pool, breakfast buffet and city views.',
  },
  5: {
    title: '5-Star Hotel',
    options: ['Premium Room / Suite', 'Buffet Breakfast', 'Infinity Pool', 'Spa Access', 'Concierge Service', 'Free WiFi'],
    note: 'Luxury 5-star resorts on JBR, Palm Jumeirah or Downtown — world-class dining, spa and beach access.',
  },
};

// ── Itineraries ─────────────────────────────────────────────────────

const ITINERARIES = {
  '3n': [
    {
      dayKey: 'day-1',
      title: 'Arrival & Marina Dinner Cruise',
      description:
        'Welcome to Dubai! Our representative meets you at the airport and transfers you to your hotel. After check-in and freshening up, head out for a spectacular Dhow Dinner Cruise along Dubai Marina. Sail past glittering skyscrapers while enjoying a lavish international buffet, live entertainment and stunning views of the illuminated skyline. Return to the hotel for overnight stay.',
    },
    {
      dayKey: 'day-2',
      title: 'City Tour & Burj Khalifa',
      description:
        'Start your morning with a guided Half-Day City Tour on a shared coach. Drive through Jumeirah Beach, photo-stop at Burj Al Arab, explore the historic Al Fahidi district, cross Dubai Creek by traditional Abra boat, and visit the Gold & Spice Souks. After lunch (on your own), head to the iconic Burj Khalifa — ascend to the 124th-floor observation deck for breathtaking 360° views of the city, desert and ocean. A private one-way transfer brings you back to the hotel.',
    },
    {
      dayKey: 'day-3',
      title: 'Desert Safari & BBQ Dinner',
      description:
        'A free morning to explore at your own pace — visit Dubai Mall, the Aquarium or the Dubai Fountain. In the afternoon, a shared 4×4 picks you up for the legendary Desert Safari. Experience thrilling dune bashing over golden sands, try sandboarding, and arrive at a Bedouin-style camp. Enjoy camel rides, henna painting, a traditional Tanoura dance show, and a sumptuous BBQ dinner under the stars before returning to the hotel.',
    },
    {
      dayKey: 'day-4',
      title: 'Departure',
      description:
        'Check out of your hotel after breakfast. Depending on your flight time, you may have a few hours for last-minute shopping at Dubai Mall or souvenir hunting at the souks. Airport transfer arranged for your departure flight. We hope you carry back wonderful memories of Dubai!',
    },
  ],

  '4n': [
    {
      dayKey: 'day-1',
      title: 'Arrival & Marina Dinner Cruise',
      description:
        'Welcome to Dubai! Our representative meets you at the airport and transfers you to your hotel. After check-in and freshening up, head out for a spectacular Dhow Dinner Cruise along Dubai Marina. Sail past glittering skyscrapers while enjoying a lavish international buffet, live entertainment and stunning views of the illuminated skyline. Return to the hotel for overnight stay.',
    },
    {
      dayKey: 'day-2',
      title: 'City Tour & Burj Khalifa',
      description:
        'Start your morning with a guided Half-Day City Tour on a shared coach. Drive through Jumeirah Beach, photo-stop at Burj Al Arab, explore the historic Al Fahidi district, cross Dubai Creek by traditional Abra boat, and visit the Gold & Spice Souks. After lunch (on your own), head to the iconic Burj Khalifa — ascend to the 124th-floor observation deck for breathtaking 360° views of the city, desert and ocean. A private one-way transfer brings you back to the hotel.',
    },
    {
      dayKey: 'day-3',
      title: 'Desert Safari & BBQ Dinner',
      description:
        'A free morning to explore at your own pace — visit Dubai Mall, the Aquarium or the Dubai Fountain. In the afternoon, a shared 4×4 picks you up for the legendary Desert Safari. Experience thrilling dune bashing over golden sands, try sandboarding, and arrive at a Bedouin-style camp. Enjoy camel rides, henna painting, a traditional Tanoura dance show, and a sumptuous BBQ dinner under the stars before returning to the hotel.',
    },
    {
      dayKey: 'day-4',
      title: 'Miracle Garden & Global Village',
      description:
        'Today explore two of Dubai\'s most vibrant attractions on a shared coach. Visit the Dubai Miracle Garden — the world\'s largest natural flower garden with over 150 million blooms arranged in stunning shapes including a life-size Emirates A380. In the evening, head to Global Village — a massive open-air cultural and entertainment destination with pavilions representing 90+ countries, street food from around the world, live shows, and carnival rides. Return to the hotel for overnight stay.',
    },
    {
      dayKey: 'day-5',
      title: 'Departure',
      description:
        'Check out of your hotel after breakfast. Depending on your flight time, you may have a few hours for last-minute shopping at Dubai Mall or souvenir hunting at the souks. Airport transfer arranged for your departure flight. We hope you carry back wonderful memories of Dubai!',
    },
  ],

  '5n': [
    {
      dayKey: 'day-1',
      title: 'Arrival & Marina Dinner Cruise',
      description:
        'Welcome to Dubai! Our representative meets you at the airport and transfers you to your hotel. After check-in and freshening up, head out for a spectacular Dhow Dinner Cruise along Dubai Marina. Sail past glittering skyscrapers while enjoying a lavish international buffet, live entertainment and stunning views of the illuminated skyline. Return to the hotel for overnight stay.',
    },
    {
      dayKey: 'day-2',
      title: 'City Tour & Burj Khalifa',
      description:
        'Start your morning with a guided Half-Day City Tour on a shared coach. Drive through Jumeirah Beach, photo-stop at Burj Al Arab, explore the historic Al Fahidi district, cross Dubai Creek by traditional Abra boat, and visit the Gold & Spice Souks. After lunch (on your own), head to the iconic Burj Khalifa — ascend to the 124th-floor observation deck for breathtaking 360° views of the city, desert and ocean. A private one-way transfer brings you back to the hotel.',
    },
    {
      dayKey: 'day-3',
      title: 'Desert Safari & BBQ Dinner',
      description:
        'A free morning to explore at your own pace — visit Dubai Mall, the Aquarium or the Dubai Fountain. In the afternoon, a shared 4×4 picks you up for the legendary Desert Safari. Experience thrilling dune bashing over golden sands, try sandboarding, and arrive at a Bedouin-style camp. Enjoy camel rides, henna painting, a traditional Tanoura dance show, and a sumptuous BBQ dinner under the stars before returning to the hotel.',
    },
    {
      dayKey: 'day-4',
      title: 'Miracle Garden & Global Village',
      description:
        'Today explore two of Dubai\'s most vibrant attractions on a shared coach. Visit the Dubai Miracle Garden — the world\'s largest natural flower garden with over 150 million blooms arranged in stunning shapes including a life-size Emirates A380. In the evening, head to Global Village — a massive open-air cultural and entertainment destination with pavilions representing 90+ countries, street food from around the world, live shows, and carnival rides. Return to the hotel for overnight stay.',
    },
    {
      dayKey: 'day-5',
      title: 'Abu Dhabi City Tour',
      description:
        'Full-day excursion to the UAE capital on a shared coach. Visit the magnificent Sheikh Zayed Grand Mosque — one of the largest in the world, with 82 white marble domes and stunning reflective pools. Drive along the Corniche, see the Etihad Towers and the Presidential Palace (Qasr Al Watan) from outside. Stop at Yas Island for photos near the Ferrari World roller coaster and the F1 circuit. Enjoy lunch at a local restaurant (on your own) before heading back to Dubai in the evening.',
    },
    {
      dayKey: 'day-6',
      title: 'Departure',
      description:
        'Check out of your hotel after breakfast. Depending on your flight time, you may have a few hours for last-minute shopping at Dubai Mall or souvenir hunting at the souks. Airport transfer arranged for your departure flight. We hope you carry back wonderful memories of Dubai and Abu Dhabi!',
    },
  ],
};

// ── Package builder ─────────────────────────────────────────────────

const DURATION_LABEL = { '3n': '3 Nights / 4 Days', '4n': '4 Nights / 5 Days', '5n': '5 Nights / 6 Days' };
const NIGHTS = { '3n': 3, '4n': 4, '5n': 5 };
const DAYS = { '3n': 4, '4n': 5, '5n': 6 };

const DURATION_THEME = {
  '3n': 'Family Getaway',
  '4n': 'Grand Explorer',
  '5n': 'Ultimate Experience',
};

const STAR_LABEL = { 3: '3-Star', 4: '4-Star', 5: '5-Star' };

function buildInclusions(duration, star, withVisa) {
  const list = [];
  if (withVisa) list.push('UAE Tourist Visa');
  list.push(
    `${STAR_LABEL[star]} Hotel (${NIGHTS[duration]} Nights)`,
    'Daily Breakfast at Hotel',
    'Return Airport Transfers',
    'Dhow Dinner Cruise at Dubai Marina',
    'Half-Day Dubai City Tour (SIC)',
    'Burj Khalifa 124th Floor Entry',
    'One-Way Private Transfer',
    'Desert Safari with BBQ Dinner (SIC)',
  );
  if (duration === '4n' || duration === '5n') {
    list.push('Miracle Garden & Global Village Tour (SIC)');
  }
  if (duration === '5n') {
    list.push('Full-Day Abu Dhabi City Tour (SIC)');
  }
  list.push('All Sightseeing as per Itinerary', 'Tourism Dirham Fee');
  return list;
}

function buildExclusions(withVisa) {
  const list = [
    'International / Domestic Flight Tickets',
    'Lunch & Dinner (unless specified)',
    'Travel Insurance',
    'Personal Expenses, Tips & Gratuities',
    'Early Check-in / Late Check-out Charges',
    'Any activity not mentioned in Inclusions',
    'PCR / COVID tests if applicable',
  ];
  if (!withVisa) list.push('UAE Tourist Visa (apply separately)');
  return list;
}

function buildHighlights(duration, star) {
  const base = [
    'Thrilling Dune Bashing & Desert Safari with BBQ',
    'Dhow Dinner Cruise with Live Entertainment',
    'Burj Khalifa 124th Floor Observation Deck',
    'Guided City Tour — Jumeirah, Gold Souk & Creek',
    `${STAR_LABEL[star]} Accommodation with Breakfast`,
  ];
  if (duration === '4n' || duration === '5n') {
    base.push('Miracle Garden — 150 Million Flowers');
    base.push('Global Village — 90+ Country Pavilions');
  }
  if (duration === '5n') {
    base.push('Abu Dhabi — Sheikh Zayed Grand Mosque');
  }
  return base;
}

function buildOverview(duration, star, withVisa) {
  const nights = NIGHTS[duration];
  const days = DAYS[duration];
  const starLabel = STAR_LABEL[star];
  const visa = withVisa ? ' with UAE tourist visa included' : '';

  let text = `Experience the best of Dubai with this all-inclusive ${nights}-night / ${days}-day ${starLabel.toLowerCase()} package${visa}. `;
  text += `Stay at a handpicked ${starLabel.toLowerCase()} property with daily breakfast and enjoy a curated mix of iconic attractions — from the Burj Khalifa observation deck and a glamorous Marina dinner cruise to a heart-pumping desert safari with BBQ under the stars. `;

  if (duration === '4n') {
    text += `This extended itinerary adds a full day at Dubai Miracle Garden and the world-famous Global Village for an extra dose of colour and culture. `;
  } else if (duration === '5n') {
    text += `This comprehensive itinerary includes Miracle Garden, Global Village, and a full-day Abu Dhabi excursion to the majestic Sheikh Zayed Grand Mosque. `;
  }

  text += `All transfers, sightseeing and entry tickets as per itinerary are included — no hidden costs, no surprises. Perfect for families, couples and first-time visitors to the UAE.`;
  return text;
}

// ── Build the 18 packages ───────────────────────────────────────────

function buildAllPackages(startId) {
  const packages = [];
  let idx = 0;

  for (const dur of ['3n', '4n', '5n']) {
    for (const star of [3, 4, 5]) {
      for (const withVisa of [true, false]) {
        const visaTag = withVisa ? 'with-visa' : 'without-visa';
        const visaLabel = withVisa ? 'Visa Included' : 'Without Visa';
        const docId = `dubai-${dur}-${star}star-${visaTag}`;
        const slug = `dubai-${NIGHTS[dur]}-nights-${star}-star-${visaLabel.toLowerCase().replace(/\s+/g, '-')}`;
        const title = `Dubai ${DURATION_THEME[dur]} – ${STAR_LABEL[star]} Stay | ${visaLabel}`;

        const aed = withVisa ? AED_WITH_VISA[dur][star] : AED_WITHOUT_VISA[dur][star];
        const { price, strikePrice } = computePrice(aed, withVisa);

        packages.push({
          _id: docId,
          _type: 'package',
          id: startId + idx,
          slug: { _type: 'slug', current: slug },
          category: 'uae',
          title,
          price,
          strikePrice,
          destination: 'Dubai, UAE',
          duration: DURATION_LABEL[dur],
          rating: 4.6,
          reviews: 0,
          overview: buildOverview(dur, star, withVisa),
          highlights: buildHighlights(dur, star),
          itinerary: { days: ITINERARIES[dur] },
          inclusions: buildInclusions(dur, star, withVisa),
          exclusions: buildExclusions(withVisa),
          hotels: HOTEL_INFO[star],
          bannerImage: BANNER_IMAGES[dur],
          images: GALLERY_IMAGES,
          themes: ['family'],
          urgency: star === 4 && withVisa ? 'high-demand' : '',
          featured: true,
          active: true,
          publishedAt: new Date().toISOString(),
        });

        idx++;
      }
    }
  }

  return packages;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🏙️  Creating 18 Dubai packages in Sanity CMS...\n');

  // Find the current highest numeric id
  const maxResult = await client.fetch(
    '*[_type == "package"] | order(id desc)[0]{ id }'
  );
  const startId = (maxResult?.id || 0) + 1;
  console.log(`   Starting numeric ID: ${startId}\n`);

  const packages = buildAllPackages(startId);

  console.log('   Creating packages one by one...\n');
  for (const pkg of packages) {
    try {
      // Remove _id so Sanity auto-generates a safe single-segment id
      const { _id, ...doc } = pkg;
      const result = await client.create(doc);
      console.log(`   ✅ ${pkg.title}  (${result._id})`);
    } catch (err) {
      if (err.message?.includes('already exists')) {
        console.log(`   ⏭️  ${pkg.title}  (already exists)`);
      } else {
        console.error(`   ❌ ${pkg.title}: ${err.message}`);
      }
    }
  }

  console.log('\n✅ All 18 packages created!\n');
  console.log('─'.repeat(70));
  console.log('Package links (traverseglobe.com):\n');

  for (const pkg of packages) {
    const slug = pkg.slug.current;
    const url = `https://traverseglobe.com/destinations/international/uae/${slug}`;
    console.log(`  ${pkg.title}`);
    console.log(`  ₹${pkg.price.toLocaleString('en-IN')}  (strike ₹${pkg.strikePrice.toLocaleString('en-IN')})`);
    console.log(`  → ${url}`);
    console.log();
  }

  console.log('─'.repeat(70));
  console.log('\n💡 All packages are set as featured=true with current publishedAt,');
  console.log('   so they will appear at the top of the homepage carousel and the');
  console.log('   UAE destination page (sorted by featured desc, publishedAt desc).\n');
}

main().catch((err) => {
  console.error('\n❌ Failed:', err.message);
  process.exit(1);
});
