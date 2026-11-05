import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const REELS_DIR = 'instagram-reels';
const OUT_DIR = join('public', 'reels-posters');

mkdirSync(OUT_DIR, { recursive: true });

const REELS = [
  { file: '2026-10-19_05-17-19_UTC.mp4', id: 'customerVideo-ig-diwali-offer' },
  { file: '2026-10-31_10-56-20_UTC.mp4', id: 'customerVideo-ig-kind-words' },
  { file: '2026-10-31_15-11-00_UTC.mp4', id: 'customerVideo-ig-halloween' },
  { file: '2026-10-27_15-39-34_UTC.mp4', id: 'customerVideo-ig-desert-50off' },
  { file: '2026-10-23_04-57-53_UTC.mp4', id: 'customerVideo-ig-majestic-hotel-stay' },
  { file: '2026-10-18_14-06-45_UTC.mp4', id: 'customerVideo-ig-dubai-package-meme' },
  { file: '2026-10-17_17-21-14_UTC.mp4', id: 'customerVideo-ig-taj-downtown' },
  { file: '2026-10-14_16-28-28_UTC.mp4', id: 'customerVideo-ig-burj-khalifa-style' },
  { file: '2026-10-13_11-26-27_UTC.mp4', id: 'customerVideo-ig-chedi-arabic' },
  { file: '2026-10-11_15-25-20_UTC.mp4', id: 'customerVideo-ig-safari-park-open' },
  { file: '2026-10-10_17-25-48_UTC.mp4', id: 'customerVideo-ig-al-seef' },
  { file: '2026-10-07_02-50-24_UTC.mp4', id: 'customerVideo-ig-5star-deals' },
  { file: '2026-10-03_11-43-29_UTC.mp4', id: 'customerVideo-ig-group-getaway' },
  { file: '2026-09-27_08-31-35_UTC.mp4', id: 'customerVideo-ig-discount-rates' },
  { file: '2026-09-23_15-40-15_UTC.mp4', id: 'customerVideo-ig-next-group' },
  { file: '2026-09-21_17-57-07_UTC.mp4', id: 'customerVideo-ig-desert-group' },
  { file: '2026-09-20_11-55-41_UTC.mp4', id: 'customerVideo-ig-day1-dubai' },
  { file: '2026-09-18_07-47-38_UTC.mp4', id: 'customerVideo-ig-all-inclusive' },
  { file: '2026-09-17_12-53-02_UTC.mp4', id: 'customerVideo-ig-atm-wrapup' },
  { file: '2026-09-14_17-17-05_UTC.mp4', id: 'customerVideo-ig-atm-glimpse' },
  { file: '2026-03-26_11-12-35_UTC.mp4', id: 'customerVideo-ig-chardham' },
  { file: '2026-03-20_12-54-02_UTC.mp4', id: 'customerVideo-ig-summer-deals' },
  { file: '2026-01-16_13-07-09_UTC.mp4', id: 'customerVideo-ig-aura-skypool' },
  { file: '2026-01-01_07-50-48_UTC.mp4', id: 'customerVideo-ig-new-year' },
  { file: '2025-11-29_05-56-39_UTC.mp4', id: 'customerVideo-ig-bali-festival' },
  { file: '2025-11-25_16-15-36_UTC.mp4', id: 'customerVideo-ig-happy-traveller' },
  { file: '2025-11-24_13-57-38_UTC.mp4', id: 'customerVideo-ig-perfect-stay' },
  { file: '2025-11-18_13-19-53_UTC.mp4', id: 'customerVideo-ig-dubai-style' },
  { file: '2025-11-07_05-38-21_UTC.mp4', id: 'customerVideo-ig-bali-paradise' },
  { file: '2025-11-03_14-27-29_UTC.mp4', id: 'customerVideo-ig-emirates-glimpse' },
  { file: '2025-11-02_12-03-57_UTC.mp4', id: 'customerVideo-ig-thailand' },
  { file: '2025-10-30_14-59-17_UTC.mp4', id: 'customerVideo-ig-personalized' },
  { file: '2025-06-29_07-08-06_UTC.mp4', id: 'customerVideo-ig-grand-hyatt' },
];

console.log(`Generating poster images for ${REELS.length} reels...`);

for (const reel of REELS) {
  const videoPath = join(REELS_DIR, reel.file);
  const outPath = join(OUT_DIR, `${reel.id}.jpg`);

  if (!existsSync(videoPath)) {
    console.log(`⚠ ${reel.file} not found, skipping`);
    continue;
  }

  try {
    // Extract frame at 0.5 seconds, scale width to 480px while maintaining aspect ratio
    execSync(`ffmpeg -ss 00:00:00.5 -i "${videoPath}" -vframes 1 -vf "scale=480:-1" -q:v 3 "${outPath}" -y`, {
      stdio: 'pipe',
    });
    console.log(`✓ Generated ${reel.id}.jpg`);
  } catch (err) {
    console.error(`✗ Failed for ${reel.id}:`, err.message);
  }
}

console.log('All posters generated successfully!');

