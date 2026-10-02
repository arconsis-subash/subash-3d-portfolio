// Fetches the YouTube playlists from their public RSS feeds (no API key needed)
// and writes src/content/videos.json. Run with: npm run videos
import { writeFile } from 'node:fs/promises';

const PLAYLISTS = [
  'PLievaKnl8uRSfgURGXy60ORAekpO6llyI',
  'PLievaKnl8uRSw3f8XlAJtJ6oYWLvQsc1O',
  'PLievaKnl8uRRqS8aLP29bcod8ck1qNIyX',
];

const OUTPUT = new URL('../src/content/videos.json', import.meta.url);

const decode = (text) => text
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

const tag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return match ? decode(match[1].trim()) : '';
};

async function fetchPlaylist(id) {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`);
  if (!response.ok) {
    throw new Error(`Playlist ${id}: HTTP ${response.status}`);
  }

  const xml = await response.text();
  const header = xml.split('<entry>')[0];
  const entries = xml.split('<entry>').slice(1);

  return {
    id,
    title: tag(header, 'title'),
    url: `https://www.youtube.com/playlist?list=${id}`,
    videos: entries.map((entry) => {
      const videoId = tag(entry, 'yt:videoId');
      return {
        id: videoId,
        title: tag(entry, 'title').replace(/\s*#\S+/g, '').trim(),
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}&list=${id}`,
      };
    }),
  };
}

const playlists = await Promise.all(PLAYLISTS.map(fetchPlaylist));
await writeFile(OUTPUT, `${JSON.stringify(playlists, null, 2)}\n`);

for (const playlist of playlists) {
  console.log(`${playlist.title}: ${playlist.videos.length} videos`);
}
