/**
 * assign-uae-card-images.mjs
 * ---------------------------------------------------------------------------
 * Gives every UAE/Dubai package shown in the homepage "Handpicked escapes"
 * carousel its own distinct banner image, matched to the package's content.
 *
 * WHY: all homepage cards come from `fetchHomepagePackages` →
 *   *[_type == "package" && active == true && category == "uae"]
 *     | order(featured desc, publishedAt desc)[0...20]
 * and the card's main photo is the package's `bannerImage` URL. When several
 * packages share a bannerImage, the carousel shows the same picture twice.
 *
 * WHAT IT DOES:
 *   1. Fetches the same UAE packages the homepage renders (same order/limit).
 *   2. Scores each package against a pool of 26 curated, free-license Pexels
 *      Dubai photos using its title + destination + themes.
 *   3. Assigns the highest-scoring image that has NOT been used yet, so no two
 *      cards get the same photo. Packages with no clear signal fall back to the
 *      next unused "general Dubai" image.
 *   4. Patches `bannerImage` on each package.
 *
 * SAFE BY DEFAULT: prints the proposed matching and writes nothing.
 * Add `--commit` to actually patch Sanity.
 *
 * USAGE:
 *   SANITY_TOKEN=<editor-token> node scripts/assign-uae-card-images.mjs          # dry run
 *   SANITY_TOKEN=<editor-token> node scripts/assign-uae-card-images.mjs --commit # apply
 *   # add --limit=30 to cover more than the 20 the homepage shows
 *   # add --gallery to also prepend the new image to each package's `images[]`
 *
 * NOTE: a dry run only reads (public read works even without a token). A commit
 * needs an Editor token. Pass it via the SANITY_TOKEN env var — do not hardcode
 * tokens (the committed token in scripts/mark-packages-featured.js should be
 * rotated).
 *
 * All images: Pexels, free license (commercial use, no attribution required).
 */

import { createClient } from '@sanity/client';

const COMMIT = process.argv.includes('--commit');
const GALLERY = process.argv.includes('--gallery');
const LIMIT = Number(
  (process.argv.find((a) => a.startsWith('--limit=')) || '--limit=20').split('=')[1]
) || 20;

const client = createClient({
  projectId: 'xe1685rk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || undefined, // only needed for --commit
});

const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

/**
 * Curated pool. `tags` drive content matching; order is the fallback priority
 * for packages with no strong signal (general skyline first). 26 distinct
 * photos > 20 homepage slots, so every card gets a unique image.
 */
const POOL = [
  // — General skyline / city (safe defaults, listed first) —
  { id: 1537493,  label: 'Burj Khalifa Aerial',        tags: ['skyline', 'burj', 'city', 'aerial'] },
  { id: 29537849, label: 'Dubai Skyline',              tags: ['skyline', 'burj', 'city'] },
  { id: 30441929, label: 'Burj Khalifa, Blue Sky',     tags: ['burj', 'skyline', 'city'] },
  { id: 18069692, label: 'Panorama from Burj Khalifa', tags: ['skyline', 'panorama', 'city'] },
  { id: 9637056,  label: 'Dubai Cityscape',            tags: ['city', 'skyline', 'tour', 'sightseeing'] },
  { id: 3769312,  label: 'Dubai High-Rises',           tags: ['city', 'skyline', 'buildings'] },
  { id: 5087052,  label: 'Skyline from the Bay',       tags: ['skyline', 'bay', 'water', 'city'] },
  // — Sunrise / sunset (honeymoon, romance) —
  { id: 33687795, label: 'Skyline at Sunset',          tags: ['sunset', 'skyline', 'honeymoon', 'romantic', 'aerial'] },
  { id: 33438757, label: 'Skyline at Sunrise',         tags: ['sunrise', 'skyline', 'honeymoon', 'romantic'] },
  // — Marina / waterfront / cruise —
  { id: 34738875, label: 'Dubai Marina Aerial',        tags: ['marina', 'yacht', 'aerial', 'luxury'] },
  { id: 4471199,  label: 'Marina & Skyscrapers',       tags: ['marina', 'yacht', 'luxury'] },
  { id: 29470806, label: 'Marina Skyline Aerial',      tags: ['marina', 'aerial', 'skyline'] },
  { id: 29267017, label: 'Marina by Day',              tags: ['marina', 'city'] },
  { id: 19612315, label: 'Cruise Ships, Dubai',        tags: ['cruise', 'marina', 'yacht', 'ship'] },
  // — Desert safari / adventure —
  { id: 909654,   label: 'Dune Bashing Convoy',        tags: ['desert', 'safari', 'adventure', 'dune', 'bashing'] },
  { id: 19159167, label: 'Desert Drive',               tags: ['desert', 'safari', 'adventure', 'drive', 'dune'] },
  { id: 31640448, label: 'Desert Safari Moment',       tags: ['desert', 'safari', 'couple', 'honeymoon'] },
  // — Beach / Palm / luxury resort —
  { id: 28902503, label: 'Atlantis Sunset',            tags: ['atlantis', 'palm', 'beach', 'luxury', 'honeymoon', 'sunset', 'resort'] },
  { id: 19192777, label: 'Atlantis from the Sea',      tags: ['atlantis', 'hotel', 'luxury', 'beach', 'resort'] },
  { id: 29212667, label: 'Palm Jumeirah Coast',        tags: ['palm', 'beach', 'aerial', 'luxury', 'island'] },
  { id: 8319455,  label: 'Aquaventure Waterpark',      tags: ['waterpark', 'family', 'adventure', 'aquaventure', 'kids', 'park'] },
  // — Fountain / downtown night —
  { id: 30400180, label: 'Dubai Fountain at Night',    tags: ['fountain', 'night', 'downtown'] },
  { id: 31747344, label: 'Burj Khalifa Night Fountain',tags: ['burj', 'night', 'fountain', 'downtown'] },
  { id: 31730713, label: 'Burj Khalifa Illuminated',   tags: ['burj', 'night', 'downtown'] },
  { id: 31730725, label: 'Burj Khalifa Blue Lights',   tags: ['burj', 'night'] },
  // — Old town / iconic / culture —
  { id: 24862673, label: 'Burj al Arab & Souk',        tags: ['burjalarab', 'souk', 'luxury', 'culture', 'oldtown'] },
];

/** Map package theme values (schema) to image tags, weighted higher. */
const THEME_TAGS = {
  honeymoon: ['honeymoon', 'romantic', 'sunset', 'couple'],
  family: ['family', 'kids', 'waterpark', 'park'],
  adventure: ['adventure', 'desert', 'safari', 'waterpark'],
  beach: ['beach', 'palm', 'atlantis', 'island'],
  pilgrimage: ['culture', 'oldtown'],
  hills: ['desert'],
};

/** Title/destination keyword → tags it signals. */
const KEYWORD_TAGS = [
  [/\b(desert|safari|dune|bashing)\b/i, ['desert', 'safari', 'adventure']],
  [/\bmarina\b/i, ['marina', 'yacht']],
  [/\b(cruise|yacht|dhow)\b/i, ['cruise', 'yacht', 'marina']],
  [/\b(burj\s*khalifa|khalifa|downtown)\b/i, ['burj', 'downtown']],
  [/\b(burj\s*al\s*arab)\b/i, ['burjalarab', 'luxury']],
  [/\b(atlantis|palm|jumeirah)\b/i, ['atlantis', 'palm', 'beach']],
  [/\b(fountain)\b/i, ['fountain', 'downtown', 'night']],
  [/\b(water\s*park|aquaventure|aqua)\b/i, ['waterpark', 'family', 'park']],
  [/\b(beach|coast|sea)\b/i, ['beach']],
  [/\b(luxury|5\s*-?\s*star|five\s*star|premium)\b/i, ['luxury']],
  [/\b(night|evening|illuminat)\b/i, ['night']],
  [/\b(honeymoon|romantic|couple)\b/i, ['honeymoon', 'romantic']],
  [/\b(family|kids|children)\b/i, ['family', 'kids']],
  [/\b(souk|old\s*dubai|creek|heritage|abra|al\s*seef|al\s*fahidi)\b/i, ['souk', 'oldtown', 'culture']],
  [/\b(city\s*tour|sightsee|highlights|explore)\b/i, ['city', 'skyline', 'tour', 'sightseeing']],
];

function wantedTags(pkg) {
  const text = [pkg.title, pkg.destination, ...(pkg.themes || [])]
    .filter(Boolean)
    .join(' ');
  const tags = new Map(); // tag -> weight

  (pkg.themes || []).forEach((t) => {
    (THEME_TAGS[t] || []).forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 3));
  });
  KEYWORD_TAGS.forEach(([re, tgs]) => {
    if (re.test(text)) tgs.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 2));
  });
  return tags;
}

function scoreImage(wanted, img) {
  let s = 0;
  for (const tag of img.tags) if (wanted.has(tag)) s += wanted.get(tag);
  return s;
}

async function main() {
  console.log(`\n🖼  UAE card-image assignment  (${COMMIT ? 'COMMIT' : 'DRY RUN'})\n`);

  const packages = await client.fetch(
    `*[_type == "package" && active == true && category == "uae"]
       | order(featured desc, publishedAt desc)[0...$limit]{
         _id, title, destination, themes, duration, bannerImage, images
       }`,
    { limit: LIMIT }
  );

  console.log(`📦 ${packages.length} UAE package(s) in the carousel\n`);
  if (packages.length === 0) return;
  if (packages.length > POOL.length) {
    console.warn(
      `⚠️  ${packages.length} packages but only ${POOL.length} pool images — ` +
        `the last ${packages.length - POOL.length} will reuse images. Add more to POOL.\n`
    );
  }

  const used = new Set();
  const plan = [];

  for (const pkg of packages) {
    const wanted = wantedTags(pkg);
    // rank unused images by score, then by pool order (index) as tiebreak/fallback
    let best = null;
    let bestScore = -1;
    POOL.forEach((img, idx) => {
      if (used.has(img.id)) return;
      const s = scoreImage(wanted, img);
      if (s > bestScore || (s === bestScore && best && idx < best.idx)) {
        best = { img, idx };
        bestScore = s;
      }
    });
    // if pool exhausted (more packages than images), allow reuse of best overall
    if (!best) {
      POOL.forEach((img, idx) => {
        const s = scoreImage(wanted, img);
        if (s > bestScore) { best = { img, idx }; bestScore = s; }
      });
    } else {
      used.add(best.img.id);
    }
    plan.push({ pkg, img: best.img, score: bestScore });
  }

  // Report
  const pad = (s, n) => String(s).padEnd(n).slice(0, n);
  console.log(pad('PACKAGE', 42), pad('THEMES', 20), pad('→ IMAGE', 26), 'score');
  console.log('─'.repeat(100));
  for (const { pkg, img, score } of plan) {
    console.log(
      pad(pkg.title || pkg._id, 42),
      pad((pkg.themes || []).join(',') || '—', 20),
      pad(img.label, 26),
      score
    );
  }
  console.log('');

  if (!COMMIT) {
    console.log('ℹ️  Dry run — nothing written. Re-run with --commit to apply.');
    console.log('   (set SANITY_TOKEN to an Editor token before committing)\n');
    return;
  }

  if (!process.env.SANITY_TOKEN) {
    console.error('❌ --commit needs SANITY_TOKEN (Editor token) in the environment.\n');
    process.exit(1);
  }

  let ok = 0;
  for (const { pkg, img } of plan) {
    const url = px(img.id);
    try {
      let patch = client.patch(pkg._id).set({ bannerImage: url });
      if (GALLERY) {
        const gallery = Array.isArray(pkg.images) ? pkg.images : [];
        const next = [url, ...gallery.filter((u) => u !== url)].slice(0, 10);
        patch = patch.set({ images: next });
      }
      await patch.commit();
      console.log(`   ✅ ${pkg.title} → ${img.label}`);
      ok++;
    } catch (e) {
      console.error(`   ❌ ${pkg.title}: ${e.message}`);
    }
  }
  console.log(`\n✅ Updated ${ok}/${plan.length} package banner images.`);
  console.log('   Refresh the homepage (cache window is ~5 min via react-query).\n');
}

main().catch((e) => {
  console.error('\n❌ Error:', e.message);
  console.error('   Is Sanity reachable, and is SANITY_TOKEN valid for --commit?\n');
  process.exit(1);
});
