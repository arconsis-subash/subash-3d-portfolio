// Reads YouTube playlists from their public RSS feeds (no API key needed).
// Used by the Cloudflare Worker (/api/videos) and by scripts/fetch-videos.mjs.

export const PLAYLISTS = [
  'PLievaKnl8uRSfgURGXy60ORAekpO6llyI',
  'PLievaKnl8uRSw3f8XlAJtJ6oYWLvQsc1O',
  'PLievaKnl8uRRqS8aLP29bcod8ck1qNIyX',
];

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

export async function fetchPlaylist(id, init) {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`, init);
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

export function fetchPlaylists(init) {
  return Promise.all(PLAYLISTS.map((id) => fetchPlaylist(id, init)));
}
