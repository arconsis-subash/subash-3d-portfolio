// Cloudflare Worker. Static files in ./dist are served first; requests that
// match no file land here. /api/videos returns the live YouTube playlists.
import { fetchPlaylists } from '../shared/playlists.js';

const CACHE_SECONDS = 3600;

async function videos(request, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/videos', request.url));
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const playlists = await fetchPlaylists({ cf: { cacheTtl: CACHE_SECONDS } });
    const response = Response.json(playlists, {
      headers: { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` },
    });
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/videos') {
      return videos(request, ctx);
    }
    return new Response('Not found', { status: 404 });
  },
};
