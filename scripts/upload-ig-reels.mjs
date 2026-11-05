/**
 * Upload Instagram reels (mp4) to Sanity CMS as customerVideo documents.
 * Ordered by popularity (most popular = lowest order number = shown first).
 *
 * Run:  SANITY_TOKEN=<editor-token> node scripts/upload-ig-reels.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const REELS_DIR = join('C:\\Users\\LENOVO\\Desktop\\Project\\Traverse-Globe\\instagram-reels');

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
});

// All 33 reels ordered by popularity/engagement.
// order: 10 = most popular (Diwali offer, 132 likes), then ranked by
// engagement signals + recency + content quality.
const REELS = [
  {
    file: '2026-10-19_05-17-19_UTC.mp4',
    id: 'customerVideo-ig-diwali-offer',
    title: 'Diwali Special Offer — Dubai',
    quote: '🪔 Special Holiday Packages from ₹39,999!',
    destination: 'uae',
    order: 10,
  },
  {
    file: '2026-10-31_10-56-20_UTC.mp4',
    id: 'customerVideo-ig-kind-words',
    title: 'Thanks for the Kind Words!',
    quote: 'Customer testimonial — desert safari experience',
    destination: 'uae',
    order: 20,
  },
  {
    file: '2026-10-31_15-11-00_UTC.mp4',
    id: 'customerVideo-ig-halloween',
    title: 'Happy Halloween — Dubai',
    quote: 'Halloween celebrations at BurJuman, Dubai 🎃',
    destination: 'uae',
    order: 30,
  },
  {
    file: '2026-10-27_15-39-34_UTC.mp4',
    id: 'customerVideo-ig-desert-50off',
    title: 'Desert Safari — 50% OFF',
    quote: 'Dubai Desert Safari 50% off for November travel!',
    destination: 'uae',
    order: 40,
  },
  {
    file: '2026-10-23_04-57-53_UTC.mp4',
    id: 'customerVideo-ig-majestic-hotel-stay',
    title: 'Book Majestic Hotels for Better Stays',
    quote: 'Majestic Hotels — handpicked for comfort',
    destination: 'uae',
    order: 50,
  },
  {
    file: '2026-10-18_14-06-45_UTC.mp4',
    id: 'customerVideo-ig-dubai-package-meme',
    title: 'Dubai Package — Viral Meme',
    quote: 'Dubai ke package le lo 😄',
    destination: 'uae',
    order: 60,
  },
  {
    file: '2026-10-17_17-21-14_UTC.mp4',
    id: 'customerVideo-ig-taj-downtown',
    title: 'Taj Dubai Downtown — Luxury Getaway',
    quote: 'Plan your luxury Dubai getaway with Traverse Globe',
    destination: 'uae',
    order: 70,
  },
  {
    file: '2026-10-14_16-28-28_UTC.mp4',
    id: 'customerVideo-ig-burj-khalifa-style',
    title: "Don't Be Part of the Crowd — Explore in Style",
    quote: 'Burj Khalifa — explore Dubai in style',
    destination: 'uae',
    order: 80,
  },
  {
    file: '2026-10-13_11-26-27_UTC.mp4',
    id: 'customerVideo-ig-chedi-arabic',
    title: 'The Chedi — Arabic Style Living',
    quote: 'A perfect place to live in Arabic style',
    destination: 'uae',
    order: 90,
  },
  {
    file: '2026-10-11_15-25-20_UTC.mp4',
    id: 'customerVideo-ig-safari-park-open',
    title: 'Dubai Safari Park is Now Open',
    quote: 'Dubai Safari Park — contact us for bookings',
    destination: 'uae',
    order: 100,
  },
  {
    file: '2026-10-10_17-25-48_UTC.mp4',
    id: 'customerVideo-ig-al-seef',
    title: "Dubai's Most Aesthetic Place — Al Seef",
    quote: 'Must be added to your itinerary',
    destination: 'uae',
    order: 110,
  },
  {
    file: '2026-10-07_02-50-24_UTC.mp4',
    id: 'customerVideo-ig-5star-deals',
    title: '5★ Stays Without the 5★ Price Tag',
    quote: 'Book Now, Pay Later — limited-time deals',
    destination: 'uae',
    order: 120,
  },
  {
    file: '2026-10-03_11-43-29_UTC.mp4',
    id: 'customerVideo-ig-group-getaway',
    title: 'Group Get-togethers & Celebrations',
    quote: 'Yacht, Marina Cruise, Desert Safari & more',
    destination: 'uae',
    order: 130,
  },
  {
    file: '2026-09-27_08-31-35_UTC.mp4',
    id: 'customerVideo-ig-discount-rates',
    title: 'Discounted Rates with Better Services',
    quote: 'Against any deal we can offer you discounted rates',
    destination: 'uae',
    order: 140,
  },
  {
    file: '2026-09-23_15-40-15_UTC.mp4',
    id: 'customerVideo-ig-next-group',
    title: "Want to Be Part of Our Next Dubai Group?",
    quote: "DM 'DUBAI' to join our next group tour",
    destination: 'uae',
    order: 150,
  },
  {
    file: '2026-09-21_17-57-07_UTC.mp4',
    id: 'customerVideo-ig-desert-group',
    title: 'Dubai Desert Safari with Our Group',
    quote: 'Desert Safari group experience ✨',
    destination: 'uae',
    order: 160,
  },
  {
    file: '2026-09-20_11-55-41_UTC.mp4',
    id: 'customerVideo-ig-day1-dubai',
    title: 'Day 1 in Dubai — Group Arrival',
    quote: 'Our group has arrived! Let the Dubai adventure begin 🌴',
    destination: 'uae',
    order: 170,
  },
  {
    file: '2026-09-18_07-47-38_UTC.mp4',
    id: 'customerVideo-ig-all-inclusive',
    title: 'Dubai All-Inclusive Package',
    quote: 'Hotel, Visa, Transfers, Tours, Experiences — one package ✈️',
    destination: 'uae',
    order: 180,
  },
  {
    file: '2026-09-17_12-53-02_UTC.mp4',
    id: 'customerVideo-ig-atm-wrapup',
    title: 'Wrapping Up ATM 2026 Dubai',
    quote: 'Great connections, inspiring moments & unforgettable memories',
    destination: 'uae',
    order: 190,
  },
  {
    file: '2026-09-14_17-17-05_UTC.mp4',
    id: 'customerVideo-ig-atm-glimpse',
    title: 'A Glimpse of Greatness at ATM 2026',
    quote: 'ATM 2026 — Sheikh Maktoum & Hamdan in the frame 👑',
    destination: 'uae',
    order: 200,
  },
  {
    file: '2026-03-26_11-12-35_UTC.mp4',
    id: 'customerVideo-ig-chardham',
    title: 'Char Dham Helicopter Yatra',
    quote: 'Helicopter Yatra, VIP Darshan — just 5 days',
    destination: 'india',
    order: 210,
  },
  {
    file: '2026-03-20_12-54-02_UTC.mp4',
    id: 'customerVideo-ig-summer-deals',
    title: 'Summer Holiday Deals',
    quote: 'Maldives, Sri Lanka, Thailand, Bali, Vietnam deals',
    destination: 'international',
    order: 220,
  },
  {
    file: '2026-01-16_13-07-09_UTC.mp4',
    id: 'customerVideo-ig-aura-skypool',
    title: 'Beautiful Evening — Aura Skypool',
    quote: 'What a beautiful evening at Aura Skypool, Dubai',
    destination: 'uae',
    order: 230,
  },
  {
    file: '2026-01-01_07-50-48_UTC.mp4',
    id: 'customerVideo-ig-new-year',
    title: 'New Year 2026 — Burj Khalifa Countdown',
    quote: 'Reverse countdown to an EPIC New Year ✨',
    destination: 'uae',
    order: 240,
  },
  {
    file: '2025-11-29_05-56-39_UTC.mp4',
    id: 'customerVideo-ig-bali-festival',
    title: 'Bali — Island of Festivals & Culture',
    quote: 'Welcome to Bali – festivals, culture & celebration! 🌺',
    destination: 'bali',
    order: 250,
  },
  {
    file: '2025-11-25_16-15-36_UTC.mp4',
    id: 'customerVideo-ig-happy-traveller',
    title: 'Another Happy Traveller ✨',
    quote: 'Thank you for trusting Traverse Globe 🤍',
    destination: 'uae',
    order: 260,
  },
  {
    file: '2025-11-24_13-57-38_UTC.mp4',
    id: 'customerVideo-ig-perfect-stay',
    title: 'A Perfect Trip Starts with a Perfect Stay',
    quote: 'Dubai stays handpicked for comfort',
    destination: 'uae',
    order: 270,
  },
  {
    file: '2025-11-18_13-19-53_UTC.mp4',
    id: 'customerVideo-ig-dubai-style',
    title: 'Dubai — Do It in Style',
    quote: 'Wanna go Dubai — do it in style!',
    destination: 'uae',
    order: 280,
  },
  {
    file: '2025-11-07_05-38-21_UTC.mp4',
    id: 'customerVideo-ig-bali-paradise',
    title: 'Explore the Living Paradise — Bali',
    quote: 'Bali — the living paradise 🌴',
    destination: 'bali',
    order: 290,
  },
  {
    file: '2025-11-03_14-27-29_UTC.mp4',
    id: 'customerVideo-ig-emirates-glimpse',
    title: 'A Glimpse of the Emirates',
    quote: 'Dubai Mall, Burj Al Arab, Palm — the Emirates experience',
    destination: 'uae',
    order: 300,
  },
  {
    file: '2025-11-02_12-03-57_UTC.mp4',
    id: 'customerVideo-ig-thailand',
    title: 'Explore Thailand in a Unique Way',
    quote: 'Phi Phi Island — luxury travel in Thailand',
    destination: 'thailand',
    order: 310,
  },
  {
    file: '2025-10-30_14-59-17_UTC.mp4',
    id: 'customerVideo-ig-personalized',
    title: 'Not Just Another Dubai Package',
    quote: 'We craft personalized itineraries, not templates ✨',
    destination: 'uae',
    order: 320,
  },
  {
    file: '2025-06-29_07-08-06_UTC.mp4',
    id: 'customerVideo-ig-grand-hyatt',
    title: 'Grand Hyatt Dubai — Luxury Meets Legacy',
    quote: 'Where luxury meets legacy — Grand Hyatt Dubai',
    destination: 'uae',
    order: 330,
  },
];

async function uploadReels() {
  console.log(`═══ Uploading ${REELS.length} Instagram Reels to Sanity CMS ═══\n`);

  let uploaded = 0;
  let skipped = 0;

  for (const reel of REELS) {
    const videoPath = join(REELS_DIR, reel.file);
    if (!existsSync(videoPath)) {
      console.log(`  ⏭ ${reel.file} — not found, skipping`);
      skipped++;
      continue;
    }

    const videoBuffer = readFileSync(videoPath);
    if (videoBuffer.length < 5000) {
      console.log(`  ⚠ ${reel.file} — too small (${videoBuffer.length}B), skipping`);
      skipped++;
      continue;
    }

    const sizeMB = (videoBuffer.length / 1024 / 1024).toFixed(1);
    console.log(`  🎬 [${uploaded + 1}/${REELS.length}] ${reel.title} (${sizeMB} MB)...`);

    // Upload video asset
    const videoAsset = await client.assets.upload('file', videoBuffer, {
      filename: reel.file,
      contentType: 'video/mp4',
    });

    // Create customerVideo document (no poster — we'll use the first frame)
    await client.createOrReplace({
      _id: reel.id,
      _type: 'customerVideo',
      videoFile: { _type: 'file', asset: { _type: 'reference', _ref: videoAsset._id } },
      title: reel.title,
      customerName: 'Traverse Globe',
      destination: reel.destination,
      quote: reel.quote,
      role: 'testimonial',
      order: reel.order,
      active: true,
    });

    console.log(`    ✓ ${reel.id} (order: ${reel.order})`);
    uploaded++;
  }

  console.log(`\n═══ Done! ${uploaded} reels uploaded, ${skipped} skipped ═══`);
}

uploadReels().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
