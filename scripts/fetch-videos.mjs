// Refreshes src/content/videos.json, the fallback the page shows when
// /api/videos is unavailable (e.g. in vite dev). Run with: npm run videos
import { writeFile } from 'node:fs/promises';
import { fetchPlaylists } from '../shared/playlists.js';

const OUTPUT = new URL('../src/content/videos.json', import.meta.url);

const playlists = await fetchPlaylists();
await writeFile(OUTPUT, `${JSON.stringify(playlists, null, 2)}\n`);

for (const playlist of playlists) {
  console.log(`${playlist.title}: ${playlist.videos.length} videos`);
}
