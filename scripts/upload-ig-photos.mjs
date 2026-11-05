/**
 * Upload Instagram photos & reels to Sanity CMS.
 * Photos → customerPhoto documents, Videos → customerVideo documents.
 * Ordered by popularity/engagement (most popular = lowest order number).
 *
 * Run:  SANITY_TOKEN=<editor-token> node scripts/upload-ig-photos.mjs
 *
 * To add reels: download mp4 files from Instagram, place them in the MEDIA_DIR
 * folder, and add entries to the VIDEOS array below.
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const MEDIA_DIR = 'C:\\Users\\LENOVO\\AppData\\Local\\Temp\\claude\\3139ec112e258cf9\\4f0aa258-e334-4c52-8a43-7a035ab3f6a0\\scratchpad\\ig-media';

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN,
});

// ── Photos (ordered by popularity) ──────────────────────────────────
const PHOTOS = [
  {
    file: '01-diwali-offer.jpg',
    id: 'customerPhoto-ig-diwali-dubai-selfie',
    caption: 'Outside Raviz Hotel, Dubai',
    altText: 'Traverse Globe team member outside Raviz Hotel in Dubai',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 10,
  },
  {
    file: '10-Deezskvo7WJ.jpg',
    id: 'customerPhoto-ig-burj-khalifa-fountain',
    caption: 'Burj Khalifa fountain show at night',
    altText: 'Person enjoying the Burj Khalifa fountain show at night in Dubai',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 20,
  },
  {
    file: '05-DfJ8RPKIP65.jpg',
    id: 'customerPhoto-ig-desert-safari-sunset',
    caption: 'Desert Safari at sunset',
    altText: 'Traveller standing on Dubai desert dunes at sunset during desert safari',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 30,
  },
  {
    file: '12-DeW-EREoKOi.jpg',
    id: 'customerPhoto-ig-dubai-safari-park',
    caption: 'Dubai Safari Park — feeding giraffes',
    altText: 'Visitor feeding a giraffe at Dubai Safari Park',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 40,
  },
  {
    file: '09-DemnN6VIeFF.jpg',
    id: 'customerPhoto-ig-taj-dubai',
    caption: 'Taj Dubai — Stay Iconic',
    altText: 'Taj Dubai hotel signboard with road signs',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 50,
  },
  {
    file: '07-De0vmGlK-FH.jpg',
    id: 'customerPhoto-ig-majestic-hotel',
    caption: 'Majestic City Retreat Hotel, Dubai',
    altText: 'Person walking towards Majestic City Retreat Hotel entrance in Dubai',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 60,
  },
  {
    file: '11-DebrirGoJNh.jpg',
    id: 'customerPhoto-ig-chedi-sharjah',
    caption: 'The Chedi Al Bait, Sharjah',
    altText: 'Person standing beside The Chedi Al Bait hotel signboard in Sharjah, UAE',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 70,
  },
  {
    file: '13-DeUbC9FoT3P.jpg',
    id: 'customerPhoto-ig-old-dubai-souk',
    caption: 'Night stroll in Old Dubai',
    altText: 'Night selfie in the old Dubai souk area with traditional architecture',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 80,
  },
  {
    file: '06-DfAMWyfoJnX.jpg',
    id: 'customerPhoto-ig-restaurant-moment',
    caption: 'Lunch break in Dubai',
    altText: 'Traveller relaxing at a restaurant in Dubai',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 90,
  },
  {
    file: '14-DePEZ33TRyx.jpg',
    id: 'customerPhoto-ig-dubai-package-promo',
    caption: 'Dubai Getaway — from ₹49,999',
    altText: 'Traverse Globe Dubai Getaway package promotional graphic',
    customerName: 'Traverse Globe',
    destination: 'uae',
    order: 100,
  },
];

// ── Videos / Reels (ordered by popularity) ──────────────────────────
// To add reels: download mp4 from Instagram app (... → Save → Download),
// place the file in MEDIA_DIR, and use the matching thumbnail as poster.
// poster file = the jpg thumbnail already downloaded above.
const VIDEOS = [
  {
    videoFile: 'reel-Deqd0kLoDVL.mp4',      // 132 likes — Diwali Dubai offer
    posterFile: '01-Deqd0kLoDVL.jpg',
    id: 'customerVideo-ig-diwali-dubai-offer',
    title: 'Diwali Dubai Trip — Raviz Hotel',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Limited-period Diwali holiday offer for Dubai!',
    order: 10,
  },
  {
    videoFile: 'reel-Deezskvo7WJ.mp4',       // Burj Khalifa fountain
    posterFile: '10-Deezskvo7WJ.jpg',
    id: 'customerVideo-ig-burj-khalifa',
    title: 'Crowd-free Burj Khalifa View',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'The best spot for the Burj Khalifa fountain show!',
    order: 20,
  },
  {
    videoFile: 'reel-DfJ8RPKIP65.mp4',       // Desert Safari
    posterFile: '05-DfJ8RPKIP65.jpg',
    id: 'customerVideo-ig-desert-safari',
    title: 'Desert Safari Sunset',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Nothing beats a Dubai desert safari at golden hour.',
    order: 30,
  },
  {
    videoFile: 'reel-DeW-EREoKOi.mp4',       // Safari Park giraffe
    posterFile: '12-DeW-EREoKOi.jpg',
    id: 'customerVideo-ig-safari-park',
    title: 'Dubai Safari Park — Another Side of Dubai',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'See another side of Dubai — feeding giraffes at Safari Park!',
    order: 40,
  },
  {
    videoFile: 'reel-DemnN6VIeFF.mp4',       // Taj Dubai
    posterFile: '09-DemnN6VIeFF.jpg',
    id: 'customerVideo-ig-taj-dubai',
    title: 'Stay Iconic — Stay Taj Dubai',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Stay iconic, stay Taj Dubai.',
    order: 50,
  },
  {
    videoFile: 'reel-De0vmGlK-FH.mp4',       // Majestic Hotel
    posterFile: '07-De0vmGlK-FH.jpg',
    id: 'customerVideo-ig-majestic-hotel',
    title: 'Majestic City Retreat Hotel',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Checked in at Majestic City Retreat Hotel, Dubai!',
    order: 60,
  },
  {
    videoFile: 'reel-DebrirGoJNh.mp4',       // The Chedi Sharjah
    posterFile: '11-DebrirGoJNh.jpg',
    id: 'customerVideo-ig-chedi-sharjah',
    title: 'The Chedi Al Bait — Arabic Heritage',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Arabic heritage in the heart of UAE.',
    order: 70,
  },
  {
    videoFile: 'reel-DeUbC9FoT3P.mp4',       // Old Dubai
    posterFile: '13-DeUbC9FoT3P.jpg',
    id: 'customerVideo-ig-old-dubai-night',
    title: 'Night Walk in Old Dubai',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Old Dubai at night hits different.',
    order: 80,
  },
  {
    videoFile: 'reel-DfAMWyfoJnX.mp4',       // Restaurant
    posterFile: '06-DfAMWyfoJnX.jpg',
    id: 'customerVideo-ig-dubai-dining',
    title: 'Dining in Dubai',
    customerName: 'Traverse Globe',
    destination: 'UAE',
    quote: 'Food scenes in Dubai are unmatched.',
    order: 90,
  },
];

async function uploadPhotos() {
  let uploaded = 0;
  for (const photo of PHOTOS) {
    const filePath = join(MEDIA_DIR, photo.file);
    if (!existsSync(filePath)) {
      console.log(`⚠ Skipping photo ${photo.file} — file not found`);
      continue;
    }
    const buffer = readFileSync(filePath);
    if (buffer.length < 1000) {
      console.log(`⚠ Skipping photo ${photo.file} — too small (${buffer.length}B)`);
      continue;
    }

    console.log(`  📷 ${photo.file} (${(buffer.length / 1024).toFixed(1)} KB)...`);
    const asset = await client.assets.upload('image', buffer, {
      filename: photo.file,
      contentType: 'image/jpeg',
    });

    await client.createOrReplace({
      _id: photo.id,
      _type: 'customerPhoto',
      photo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      altText: photo.altText,
      caption: photo.caption,
      customerName: photo.customerName,
      destination: photo.destination,
      order: photo.order,
      active: true,
    });
    console.log(`    ✓ ${photo.id}`);
    uploaded++;
  }
  return uploaded;
}

async function uploadVideos() {
  let uploaded = 0;
  for (const video of VIDEOS) {
    const videoPath = join(MEDIA_DIR, video.videoFile);
    if (!existsSync(videoPath)) {
      console.log(`  ⏭ Skipping reel ${video.videoFile} — file not found (download from Instagram app)`);
      continue;
    }
    const videoBuffer = readFileSync(videoPath);
    if (videoBuffer.length < 5000) {
      console.log(`  ⚠ Skipping reel ${video.videoFile} — too small`);
      continue;
    }

    console.log(`  🎬 ${video.videoFile} (${(videoBuffer.length / 1024 / 1024).toFixed(1)} MB)...`);

    // Upload video asset
    const videoAsset = await client.assets.upload('file', videoBuffer, {
      filename: video.videoFile,
      contentType: 'video/mp4',
    });

    // Upload poster image if available
    let posterRef = undefined;
    const posterPath = join(MEDIA_DIR, video.posterFile);
    if (existsSync(posterPath)) {
      const posterBuffer = readFileSync(posterPath);
      if (posterBuffer.length > 1000) {
        const posterAsset = await client.assets.upload('image', posterBuffer, {
          filename: video.posterFile,
          contentType: 'image/jpeg',
        });
        posterRef = { _type: 'image', asset: { _type: 'reference', _ref: posterAsset._id } };
      }
    }

    await client.createOrReplace({
      _id: video.id,
      _type: 'customerVideo',
      videoFile: { _type: 'file', asset: { _type: 'reference', _ref: videoAsset._id } },
      poster: posterRef || undefined,
      title: video.title,
      customerName: video.customerName,
      destination: video.destination,
      quote: video.quote,
      role: 'testimonial',
      order: video.order,
      active: true,
    });
    console.log(`    ✓ ${video.id}`);
    uploaded++;
  }
  return uploaded;
}

async function run() {
  console.log('═══ Instagram → Sanity CMS Upload ═══\n');

  console.log('── Photos ──');
  const photoCount = await uploadPhotos();
  console.log(`\n${photoCount} photos uploaded.\n`);

  console.log('── Reels / Videos ──');
  const videoCount = await uploadVideos();
  console.log(`\n${videoCount} videos uploaded.\n`);

  console.log(`Done! ${photoCount} photos + ${videoCount} videos in Sanity CMS.`);
  if (videoCount === 0) {
    console.log('\nTo add reels: download mp4 files from Instagram app,');
    console.log(`save them in:\n  ${MEDIA_DIR}`);
    console.log('Named as: reel-SHORTCODE.mp4 (e.g. reel-Deqd0kLoDVL.mp4)');
    console.log('Then re-run this script.');
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
